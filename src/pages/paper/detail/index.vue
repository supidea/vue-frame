<template>
  <div class="p-paper-detail">
    <h2 class="p-paper-detail__tit">{{paperName}}</h2>
    <v-question v-for="(item, index) in itemInfos" :key="index" :data="item" :show-score="true" :show-idx="true" />
  </div>
</template>

<script>
import vQuestion from '../../../components/question'
import { paper } from '../../../api'
export default {
  components: {
    vQuestion
  },
  data() {
    return {
      paperName: '',
      itemInfos: []
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
        this.itemInfos = res.data.itemInfos
        this.paperName = res.data.paperName
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>

<style lang="less">
.p-paper-detail{
  width: 210mm;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  &__tit{
    text-align: center;
  }
}
</style>
