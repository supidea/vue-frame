<template>
  <div>
    <v-search-bar class="l-mb" placeholder="请输入讲义名称" :value="searchKey" :loading="loading" @search="search" size="small" style="width: 300px" />
    <v-topic-filter-panel class="l-mb" label-width="80px" :type="['gradeId','courseTypeId','productCode']" :value.sync="selectorResult" @change="filterList" />
    <v-table border :data="tableData" v-loading="loading" :columns="columns" header-row-class-name="m-table-hd" class="m-table" />
    <div class="l-mt l-tar" v-if="pageTotal > 0">
      <el-pagination background layout="total, prev, pager, next" @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" class="m-pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import vSearchBar from '../../../components/search-bar'
import vTopicFilterPanel from '../../../components/topic-filter-panel'
import vTable from '../../../components/table'
import { lecture } from '../../../api'
import columns from './columns'
export default {
  components: {
    vTopicFilterPanel,
    vSearchBar,
    vTable
  },
  data() {
    return {
      columns: columns(this),
      tableData: [],
      selectorResult: {},
      searchKey: '',
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0
    }
  },
  mounted() {
    this.getLectureList()
  },
  methods: {
    // 获取讲义列表数据
    async getLectureList({
      currentPage = 1,
      pageSize = 10,
      ...params
    } = {}) {
      this.loading = true
      try {
        let res = await lecture.getLectureList({
          currentPage,
          pageSize,
          ...params
        })
        this.currentPage = res.data.currentPage || 0
        this.pageTotal = res.data.total || 0
        this.tableData = res.data.list || []
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 搜索讲义
    search(searchKey) {
      this.searchKey = searchKey
      this.getLectureList({
        name: searchKey
      })
    },
    // 分页切换
    changePage(currentPage) {
      this.getLectureList({
        currentPage,
        ...this.selectorResult,
        name: this.searchKey
      })
    },
    // 删除讲义
    async remove(params) {
      try {
        await this.$confirm('是否删除该讲义', { type: 'warning' })
        await lecture.removeLeture(params.row.id)
        this.tableData.splice(params.$index, 1)
        this.pageTotal -= 1
      } catch (e) {
        e !== 'cancel' && this.$message.error(e)
      }
    },
    // 筛选面板筛选事件
    filterList(val) {
      this.selectorResult = val
      this.getLectureList({
        ...this.selectorResult,
        name: this.searchKey
      })
    }
  }
}
</script>
