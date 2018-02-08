<template>
  <el-form-item :label="label">
    <el-radio-group v-model="selectResult" v-if="type === 'radioButton'">
      <el-radio-button :label="item.code" v-for="item in options" :key="item.code">{{item.label}}</el-radio-button>
    </el-radio-group>
    <el-select v-model="selectResult" placeholder="请选择" style="width: 100%" v-if="type==='select'">
      <el-option :label="item.label" :value="item.code" v-for="item in options" :key="item.code">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String],
      default: ''
    },
    type: {
      type: String,
      default: 'select'
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
