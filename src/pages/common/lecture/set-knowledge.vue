<template>
  <div class="p-knowledge-set m-box">
    <el-form ref="form" :v-model="form" size="mini" label-width="90px">
      <el-form-item label="讲义名称">
        <el-input v-model="form.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="form.gradeId" disabled placeholder="请选择" style="width: 300px">
          <el-option label="初一" value="111">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品线">
        <el-radio-group v-model="form.productCode">
          <el-radio :label="3">快乐学习</el-radio>
          <el-radio :label="6">个性化</el-radio>
          <el-radio :label="9">培英班</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="课程类型">
        <el-radio-group v-model="form.productCode">
          <el-radio :label="3">快乐学习</el-radio>
          <el-radio :label="6">个性化</el-radio>
          <el-radio :label="9">培英班</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设定知识点">
        <el-button size="mini" icon="el-icon-plus">超小按钮</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        productCode: 3,
        gradeId: '',
        lecturePointRequire: []
      }
    }
  }
}
</script>

<style>
.p-knowledge-set {
  height: 300px;
  padding: 20px;
}
</style>
