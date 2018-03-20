<template>
  <div>{{name}}</div>
</template>

<script>
import { textbook } from '../../../api'
export default {
  data() {
    return {
      name: '',
      data: {}
    }
  },
  watch: {
    '$route'() {
      this.getTextbookDetail(this.$route.params.id)
    }
  },
  created() {
    this.getTextbookDetail(this.$route.params.id)
  },
  methods: {
    async getTextbookDetail(id) {
      try {
        let res = await textbook.getTextbookDetail(id)
        this.name = res.data.name
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>
