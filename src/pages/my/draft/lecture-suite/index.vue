<template>
  <div>
    <v-search-bar class="l-mb" placeholder="请输入讲义名称" :value="searchKey" :loading="loading" @search="search" size="small" style="width: 300px" />
    <v-table border :data="tableData" v-loading="loading" :columns="columns" header-row-class-name="m-table-hd" class="m-table" />
    <div class="l-mt l-tar" v-if="pageTotal > 0">
      <el-pagination background layout="total, prev, pager, next" @current-change="changePage" :current-page="currentPage" :page-size="pageSize" :total="pageTotal" class="m-pagination">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import vSearchBar from '../../../../components/search-bar'
import vTable from '../../../../components/table'
import { lecture } from '../../../../api'
export default {
  components: {
    vSearchBar,
    vTable
  },
  data() {
    return {
      columns: [
        {
          prop: 'name',
          label: '讲义套件名称',
          'show-overflow-tooltip': true
        },
        {
          prop: 'gradeName',
          label: '年级',
          width: 100
        },
        {
          prop: 'courseTypeName',
          label: '课程类型',
          width: 100
        },
        {
          prop: 'updateTime',
          label: '更新时间',
          width: 160
        },
        {
          label: '操作',
          width: 100,
          align: 'center',
          render: (h, params) => (
            <div class="m-table-btn--opera">
              <i class="el-icon-edit" title="编辑" />
              <i class="el-icon-delete" title="删除" onClick={() => this.remove(params)}/>
            </div>
          )
        }
      ],
      tableData: [],
      searchKey: '',
      loading: false,
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0
    }
  },
  mounted() {
    this.getLectureSuiteList()
  },
  methods: {
    // 获取讲义列表数据
    async getLectureSuiteList({currentPage = 1, pageSize = 10, ...params} = {}) {
      this.loading = true
      try {
        let res = await lecture.getLectureSuiteList({
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
      this.getLectureSuiteList({
        name: searchKey
      })
    },
    // 分页切换
    changePage(currentPage) {
      this.getLectureSuiteList({
        currentPage,
        name: this.searchKey
      })
    },
    // 删除讲义
    async remove(params) {
      try {
        await this.$confirm('是否删除该讲义套件', { type: 'warning' })
        await lecture.removeLectureSuite(params.row.id)
        this.tableData.splice(params.$index, 1)
        this.pageTotal -= 1
      } catch (e) {
        e !== 'cancel' && this.$message.error(e)
      }
    }
  }
}
</script>
