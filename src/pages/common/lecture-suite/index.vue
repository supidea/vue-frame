<template>
  <div class="lecture-suite">
    <div class="lecture-suite-wrap">
      <v-item>
        <a href="">查看</a>
      </v-item>
    </div>
  </div>
</template>

<script>
import vItem from './item'
export default {
  components: {
    vItem
  }
}
</script>

<style lang="less">
.lecture-suite{
  background: #fff;
}
.lecture-suite-wrap{
  margin: 0 auto;
  width: 210mm;
  padding: 40px;
}
</style>
