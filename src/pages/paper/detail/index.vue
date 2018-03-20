<template>
  <div>{{paperName}}</div>
</template>

<script>
import { paper } from '../../../api'
export default {
  data() {
    return {
      paperName: '',
      data: {}
    }
  },
  watch: {
    '$route'() {
      this.getPaperDetail(this.$route.params.id)
    }
  },
  created() {
    this.getPaperDetail(this.$route.params.id)
  },
  methods: {
    async getPaperDetail(id) {
      try {
        let res = await paper.getPaperDetail(id)
        this.paperName = res.data.paperName
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>
