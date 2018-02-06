<template>
  <div>
    <el-popover ref="popover" placement="bottom" width="240" trigger="click" transition="fade-in-linear" @hide="handleHide">
      <div class="select-subject-panel__title">选择知识体系科目学科</div>
      <el-form label-width="70px" size="mini">
        <el-form-item label="知识体系">
          <el-select placeholder="请选择" style="width: 100%">
            <el-option :label="'厦门'" :value="'0592'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目">
          <el-select placeholder="请选择" style="width: 100%">
            <el-option :label="'厦门'" :value="'0592'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学段">
          <el-radio-group>
            <el-radio-button :label="1">地方</el-radio-button>
            <el-radio-button :label="2">地方</el-radio-button>
            <el-radio-button :label="3">地方</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="text-align: center" label-width="0">
          <el-button type="primary" :loading="loading" @click="update">{{loading?'正在提交...':'确定'}}</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
    <div v-popover:popover>
      <el-button size="mini">
        广东初中数学
        <i class="el-icon-arrow-down"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    update() {
      this.loading = true
    },
    handleHide() {
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.select-subject-panel{
  &__title {
    font-size: 12px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
}
</style>
