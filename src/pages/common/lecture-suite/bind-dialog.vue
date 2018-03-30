<template>
  <el-dialog custom-class="m-dialog" title="收货地址" :visible.sync="visible" :before-close="close" center>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="value" :name="key" v-for="(value, key) in types" :key="key"></el-tab-pane>
    </el-tabs>
    <v-table :data="tableData" v-loading="loading" :columns="columns" header-row-class-name="m-table-hd" class="m-table" size="mini" />
    <div class="l-mt l-tac" v-if="pageTotal > 0">
      <el-pagination background layout="total, prev, pager, next" @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" class="m-pagination">
      </el-pagination>
    </div>
    <div slot="footer">
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button size="mini" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { lecture, paper } from '../../../api'
import { lectureColumns, paperColumns } from './columns'
import vTable from '../../../components/table'
export default {
  components: {
    vTable
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      activeName: 'LECTURE',
      currentPage: 1,
      pageSize: 5,
      pageTotal: 100
    }
  },
  computed: {
    ...mapState({
      types: state => state.app.types
    }),
    columns() {
      if (this.activeName === 'LECTURE') {
        return lectureColumns
      }
      if (this.activeName === 'PAPER') {
        return paperColumns
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    handleClick() {},
    // 获取讲义列表
    async getLectureList({ currentPage = 1, pageSize = 10, ...params } = {}) {
      this.loading = true
      try {
        let res = await lecture.getLectureList({
          currentPage,
          pageSize,
          ...params
        })
        console.log(res)
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 获取试卷列表
    async getPaperList({ currentPage = 1, pageSize = 5, ...params } = {}) {
      this.loading = true
      try {
        let res = await paper.getPaperList({ currentPage, pageSize, ...params })
        console.log(res)
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 初始化数据
    initData() {},
    changePage() {}
  }
}
</script>
