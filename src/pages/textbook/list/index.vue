<template>
  <div>
    <v-search-bar class="l-mb" placeholder="请输入教材名称" :value="searchKey" :loading="loading" @search="search" size="small" style="width: 300px"/>
    <v-topic-filter-panel class="l-mb" label-width="80px" :type="['yearId','regionId','gradeId','textbookTypeId','seasonId','productCode']" :value.sync="selectorResult" @change="handlerfilter"/>
    <v-list :data="list"/>
    <div class="l-mt l-tar" v-if="pageTotal > 0">
      <el-pagination background layout="total, prev, pager, next" @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" class="m-pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { textbook } from '../../../api'
import vSearchBar from '../../../components/search-bar'
import vTopicFilterPanel from '../../../components/topic-filter-panel'
import vList from './list'
export default {
  components: {
    vList,
    vSearchBar,
    vTopicFilterPanel
  },
  data() {
    return {
      searchKey: '',
      selectorResult: {},
      list: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      loading: false
    }
  },
  mounted() {
    this.getTextbookList()
  },
  methods: {
    // 获取试卷列表数据
    async getTextbookList({ currentPage = 1, pageSize = 10, ...params } = {}) {
      this.loading = true
      try {
        let res = await textbook.getTextbookList({ currentPage, pageSize, ...params })
        this.currentPage = res.data.currentPage || 0
        this.pageTotal = res.data.total || 0
        this.list = res.data.list || []
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 搜索试卷列表数据
    search(val) {
      this.searchKey = val
      this.getTextbookList({
        ...this.selectedResult,
        searchKey: this.searchKey
      })
    },
    // 筛选试卷列表数据
    handlerfilter(val) {
      this.selectorResult = val
      this.getTextbookList({
        ...this.selectorResult,
        searchKey: this.searchKey
      })
    },
    // 分页跳转
    changePage(currentPage) {
      this.getTextbookList({
        currentPage,
        ...this.selectorResult,
        searchKey: this.searchKey
      })
    }
  }
}
</script>
