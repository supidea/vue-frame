<template>
  <div class="p-knowledge-set m-box">
    <el-form ref="form" :v-model="form" size="mini" label-width="90px">
      <el-form-item label="讲义名称">
        <el-input v-model="form.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="form.gradeId" disabled placeholder="请选择" style="width: 300px">
          <el-option :label="item.label" :value="item.code" v-for="item in gradeList" :key="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品线">
        <el-radio-group v-model="form.productCode">
          <el-radio :label="item.code" v-for="item in productList" :key="item.code">{{item.label}}</el-radio>
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
        <v-table border :data="tableData" :columns="columns" class="l-mt" size="mini" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vTable from '../../../components/table'
import columns from './columns'
import { app } from '../../../api'
export default {
  components: {
    vTable
  },
  data() {
    return {
      form: {
        name: '',
        productCode: 3,
        gradeId: '',
        lecturePointRequire: []
      },
      tableData: [],
      columns: columns(this),
      gradeList: [],
      productList: [],
      courseTypeList: []
    }
  },
  mounted() {
    this.getDictData()
  },
  methods: {
    async getDictData() {
      try {
        let res = await app.getDictData('LECTURE', false)
        const gradeList = res.data.find(v => v.key === 'gradeId')
        this.gradeList = gradeList.list
        const productList = res.data.find(v => v.key === 'productCode')
        this.productList = productList.list
        const courseTypeList = res.data.find(v => v.key === 'courseTypeId')
        this.courseTypeList = courseTypeList.list
      } catch (e) {}
    }
  }
}
</script>

<style>
.p-knowledge-set {
  padding: 20px;
}
</style>
