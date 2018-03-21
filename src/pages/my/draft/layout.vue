<template>
  <div class="draft">
    <el-tabs v-model="activeName" @tab-click="jump">
      <el-tab-pane label="我的讲义" name="My_Draft_Lecture"></el-tab-pane>
      <el-tab-pane label="讲义套件" name="My_Draft_Lecture-suite"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: this.$route.name
    }
  },
  watch: {
    '$route'() {
      console.log(this.$route)
      this.activeName = this.$route.name
    }
  },
  methods: {
    jump() {
      this.$router.push({name: this.activeName})
    }
  }
}
</script>
