<template>
  <div>
    <component :is="currentView"/>
    <el-button @click="currentView='step-one'">1</el-button>
    <el-button @click="currentView='step-two'">2</el-button>
  </div>
</template>

<script>
export default {
  components: {
    'step-one': () => import('./set-knowledge'),
    'step-two': () => import('./import-knowledge')
  },
  data() {
    return {
      currentView: 'step-one'
    }
  }
}
</script>
