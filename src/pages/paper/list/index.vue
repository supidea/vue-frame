<template>
  <div>
    <v-search-bar class="l-mb" placeholder="请输入试卷名称" :value="searchKey" :loading="loading" @search="searchPaperList" size="small" style="width: 300px" />
    <v-topic-filter-panel class="l-mb" label-width="80px" :type="['yearId','regionId','gradeId','paperTypeId','productCode']" :value.sync="selectorResult" @change="filterPaperList" />
    <v-table border :data="tableData" v-loading="loading" :columns="columns" header-row-class-name="m-table-hd" class="m-table" />
    <div class="l-mt l-tar" v-if="pageTotal > 0">
      <el-pagination background layout="total, prev, pager, next" @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" class="m-pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { paper } from '../../../api'
import vSearchBar from '../../../components/search-bar'
import vTable from '../../../components/table'
import vTopicFilterPanel from '../../../components/topic-filter-panel'
import columns from './columns'
export default {
  components: {
    vTable,
    vSearchBar,
    vTopicFilterPanel
  },
  data() {
    return {
      searchKey: '',
      selectorResult: {},
      columns: columns(this),
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      loading: false
    }
  },
  mounted() {
    this.getPaperList()
  },
  methods: {
    // 获取试卷列表数据
    async getPaperList({ currentPage = 1, pageSize = 10, ...params } = {}) {
      this.loading = true
      try {
        let res = await paper.getPaperList({ currentPage, pageSize, ...params })
        this.pageTotal = res.data.total
        this.tableData = res.data.list
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 搜索试卷列表数据
    searchPaperList(val) {
      this.searchKey = val
      this.getPaperList({
        ...this.selectedResult,
        searchKey: this.searchKey
      })
    },
    // 筛选试卷列表数据
    filterPaperList(val) {
      this.selectorResult = val
      this.getPaperList({
        ...this.selectorResult,
        searchKey: this.searchKey
      })
    },
    // 分页跳转
    changePage(currentPage) {
      this.getPaperList({
        currentPage,
        ...this.selectorResult,
        searchKey: this.searchKey
      })
    }
  }
}
</script>
