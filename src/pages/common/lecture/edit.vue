<template>
  <div v-loading="loading">
    <keep-alive>
      <component :is="currentView" :data="data"/>
    </keep-alive>
    <el-button @click="currentView='step-one'">1</el-button>
    <el-button @click="currentView='step-two'">2</el-button>
  </div>
</template>

<script>
import { lecture } from '../../../api'
export default {
  components: {
    'step-one': () => import('./set-knowledge'),
    'step-two': () => import('./import-knowledge')
  },
  data() {
    return {
      currentView: 'step-one',
      loading: false,
      data: {}
    }
  },
  created() {
    this.getLectureEditInfo(this.$route.params.id)
  },
  methods: {
    // 获取讲义编辑信息
    async getLectureEditInfo(id) {
      this.loading = true
      try {
        let res = await lecture.getLectureEditInfo(id)
        this.data = res.data
        console.log(this.data)
      } catch (e) {}
      this.loading = false
    }
  }
}
</script>
