<template>
  <el-form-item :label="data.label">
    <el-radio-group v-model="selectResult" v-if="data.key === 'periodId'">
      <el-radio-button :label="item.code" v-for="item in data.list" :key="item.code">{{item.label}}</el-radio-button>
    </el-radio-group>
    <el-select v-model="selectResult" placeholder="请选择" style="width: 100%" v-else>
      <el-option :label="item.label" :value="item.code" v-for="item in data.list" :key="item.code">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    selectResult: {
      set(val) {
        this.$emit('input', val)
      },
      get() {
        return this.value
      }
    }
  }
}
</script>
