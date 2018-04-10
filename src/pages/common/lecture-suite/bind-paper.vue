<template>
  <div>
    <el-form :inline="true" :model="searchForm" size="mini" @submit.native.prevent>
      <el-form-item label="年级">
        <el-select v-model="searchForm.gradeId" placeholder="选择年级" @change="search">
          <el-option label="不限" value=""></el-option>
          <el-option :label="item.label" :value="item.code" v-for="item in gradeOptions" :key="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchForm.paperTypeId" placeholder="选择试卷类型" @change="search">
          <el-option label="不限" value=""></el-option>
          <el-option :label="item.label" :value="item.code" v-for="item in paperTypeOptions" :key="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="试卷名称" v-model="searchForm.searchKey" @keyup.enter.native="search"></el-input>
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
  </div>
</template>

<script>
import { paperColumns } from './columns'
import { paper } from '../../../api'
import vTable from '../../../components/table'
export default {
  components: {
    vTable
  },
  props: {
    gradeId: {
      type: [String, Number],
      default: ''
    },
    selectedData: {
      type: Object,
      default: () => { return {} }
    },
    select: Function
  },
  data() {
    return {
      columns: paperColumns(this),
      tableData: [],
      loading: false,
      searchForm: {
        gradeId: this.gradeId,
        searchKey: '',
        paperTypeId: ''
      },
      currentPage: 1,
      pageSize: 5,
      pageTotal: 0
    }
  },
  computed: {
    gradeOptions() {
      let grade = this.$store.getters.getBaseOptions('gradeId')
      return grade.length > 0 ? grade[0].list : []
    },
    paperTypeOptions() {
      let paperType = this.$store.getters.getBaseOptions('paperTypeId')
      return paperType.length > 0 ? paperType[0].list : []
    }
  },
  created() {
    this.getPaperList(this.searchForm)
  },
  methods: {
    // 获取试卷列表
    async getPaperList({ currentPage = 1, pageSize = 5, ...params } = {}) {
      this.loading = true
      try {
        let res = await paper.getPaperList({ currentPage, pageSize, ...params })
        this.tableData = res.data.list
        this.currentPage = res.data.currentPage
        this.pageTotal = res.data.total
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    changePage(val) {
      this.currentPage = val
      this.getPaperList({currentPage: this.currentPage, ...this.searchForm})
    },
    search() {
      this.getPaperList(this.searchForm)
    }
  }
}
</script>
