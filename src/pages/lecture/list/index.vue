<template>
  <div>
    <v-search-bar class="l-mb" placeholder="请输入讲义名称" :value="searchKey" :loading="loading" @search="search" size="small" style="width: 300px"/>
    <v-topic-filter-panel class="l-mb" label-width="80px" type="LECTURE_LIB" :value.sync="selectorResult" @change="handlerfilter"/>
    <v-table border :data="tableData" v-loading="loading" :columns="columns" header-row-class-name="m-table-hd" class="m-table"/>
    <div class="l-mt l-tar" v-if="pageTotal > 0">
      <el-pagination background layout="total, prev, pager, next" @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" class="m-pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { lecture } from '../../../api'
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
      paper: this.$route.params.id || '',
      columns: columns(this),
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      loading: false
    }
  },
  mounted() {
    this.getLectureLibList()
  },
  methods: {
    // 获取试卷列表数据
    async getLectureLibList({ currentPage = 1, pageSize = 10, ...params } = {}) {
      this.loading = true
      try {
        let res = await lecture.getLectureLibList({ currentPage, pageSize, ...params })
        this.currentPage = res.data.currentPage || 0
        this.pageTotal = res.data.total || 0
        this.tableData = res.data.list || []
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 搜索试卷列表数据
    search(val) {
      this.searchKey = val
      this.getLectureLibList({
        ...this.selectedResult,
        searchKey: this.searchKey
      })
    },
    // 筛选试卷列表数据
    handlerfilter(val) {
      this.selectorResult = val
      this.getLectureLibList({
        ...this.selectorResult,
        searchKey: this.searchKey
      })
    },
    // 分页跳转
    changePage(currentPage) {
      this.getLectureLibList({
        currentPage,
        ...this.selectorResult,
        searchKey: this.searchKey
      })
    }
  }
}
</script>
