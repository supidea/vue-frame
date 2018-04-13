<template>
  <el-dialog custom-class="m-dialog" title="绑定讲义套件" :visible.sync="visible" :before-close="close" center>
    <div class="schedule-bind-dialog__car l-mb" :class="{'is-selected': selectedDataName}" :title="selectedDataName">{{selectedDataName || '未选中任何讲义套件'}}</div>
    <el-form :inline="true" :model="searchForm" size="mini" @submit.native.prevent>
      <el-form-item label="年级">
        <el-select v-model="searchForm.gradeId" placeholder="选择年级" @change="search">
          <el-option label="不限" value=""></el-option>
          <el-option :label="item.label" :value="item.code" v-for="item in gradeOptions" :key="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="讲义套件名称" v-model="searchForm.name" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <v-table :data="tableData" v-loading="loading" :columns="columns" header-row-class-name="m-table-hd" class="m-table" size="mini" />
    <div class="l-mt l-tac" v-if="pageTotal > 0">
      <el-pagination background layout="total, prev, pager, next" @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" class="m-pagination">
      </el-pagination>
    </div>
    <div slot="footer">
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button size="mini" type="primary" @click="submit" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import vTable from '../../components/table'
import columns from './columns'
import { lecture, app } from '../../api'
export default {
  components: {
    vTable
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      columns: columns(this),
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      pageTotal: 0,
      selectedData: {},
      loading: false,
      searchForm: {
        gradeId: '',
        subjectId: '',
        name: ''
      },
      gradeOptions: [],
      submitLoading: false,
      attendanceId: ''
    }
  },
  computed: {
    selectedDataName() {
      if (!this.selectedData.id) return ''
      return this.convertLectureSuiteName(this.selectedData)
    },
    params() {
      let {attendanceId, courseDate, courseId, endTime, startTime} = this.data
      return {attendanceId, courseDate, courseId, endTime, startTime}
    }
  },
  watch: {
    visible(val) {
      if (val && this.attendanceId !== this.data.attendanceId) {
        this.attendanceId = this.data.attendanceId
        this.searchForm.gradeId = this.data.gradeId
        this.searchForm.subjectId = this.data.subjectId
        this.searchForm.name = ''
        this.selectedData = {}
        this.getGradeOptions(this.searchForm.gradeId)
        this.getLectureSuiteList(this.searchForm)
      }
    }
  },
  methods: {
    // 获取讲义套件列表
    async getLectureSuiteList({ currentPage = 1, pageSize = 5, ...data } = {}) {
      this.loading = true
      try {
        let res = await lecture.getLectureSuiteList({
          currentPage,
          pageSize,
          status: 'DISABLED',
          ...data
        })
        this.tableData = res.data.list
        this.currentPage = res.data.currentPage
        this.pageTotal = res.data.total
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 根据年级ID获取同学段下其他年级
    async getGradeOptions(gradeId) {
      let res = await app.getGradeList(gradeId)
      this.gradeOptions = res.data || []
    },
    // 关闭弹框，并清楚数据
    close() {
      this.$emit('update:visible', false)
    },
    select(val) {
      this.selectedData = val
    },
    search() {
      this.getLectureSuiteList(this.searchForm)
    },
    changePage(val) {
      this.currentPage = val
      this.getLectureSuiteList({currentPage: this.currentPage, ...this.searchForm})
    },
    // 绑定
    async bind() {
      this.submitLoading = true
      try {
        await lecture.courseBindLectureSuite({lectureSuitId: this.selectedData.id, bindFlag: false, ...this.params})
        this.$emit('bind-success')
        this.close()
      } catch (e) {
        this.$message.error(e)
      }
      this.submitLoading = false
    },
    // 提交确认
    async submit() {
      if (!this.selectedData.id) {
        return this.$message.error('未选中任何讲义套件，请选择！')
      }
      this.bind()
    },
    // 生成选中讲义套件名称
    convertLectureSuiteName(data) {
      let { name, gradeName, courseTypeName } = data
      let arr = []
      if (gradeName) {
        gradeName = '年级：' + gradeName
        arr.push(gradeName)
      }
      if (courseTypeName) {
        courseTypeName = '课程类型' + courseTypeName
        arr.push(courseTypeName)
      }
      let str = arr.join(',')
      if (arr.length > 0) str = '已选讲义套件：' + name + '（' + str + '）'
      return str
    }
  }
}
</script>

<style lang="less">
.schedule-bind-dialog__car {
  border: 1px solid var(--border-color);
  line-height: 24px;
  height: 24px;
  padding: 10px 20px;
  color: var(--gray-light);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  &.is-selected {
    --border-color: var(--blue);
    --gray-light: var(--blue);
  }
}
</style>
