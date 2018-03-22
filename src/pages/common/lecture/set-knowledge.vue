<template>
  <div class="p-knowledge-set m-box">
    <el-form ref="form" :v-model="form" :rules="rules" size="mini" label-width="90px">
      <el-form-item label="讲义名称" prop="name">
        <el-input v-model="form.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="gradeId">
        <el-select v-model="form.gradeId" disabled placeholder="请选择" style="width: 300px">
          <el-option :label="item.label" :value="item.code" v-for="item in gradeList" :key="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品线" prop="productCode">
        <el-radio-group v-model="form.productCode">
          <el-radio :label="item.code" v-for="item in productList" :key="item.code">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="课程类型" prop="courseTypeCode">
        <el-radio-group v-model="form.courseTypeCode">
          <el-radio :label="item.code" v-for="item in courseTypeList" :key="item.code">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设定知识点" prop="pointIds">
        <el-button size="mini" icon="el-icon-plus">超小按钮</el-button>
        <v-table border :data="tableData" :columns="columns" class="l-mt" size="mini" />
      </el-form-item>
    </el-form>
    <div class="l-mt l-tac">
      <el-button size="small">下一步</el-button>
      <el-button type="primary" size="small">下一步</el-button>
    </div>
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
        productCode: '',
        courseTypeCode: '',
        gradeId: '',
        pointIds: []
      },
      tableData: [],
      columns: columns(this),
      gradeList: [],
      productList: [],
      courseTypeList: [],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    tableData: {
      hanlder(val) {
        this.form.pointIds = val.map(v => v.id)
      },
      deep: true
    }
  },
  mounted() {
    this.getDictData()
  },
  methods: {
    async getDictData() {
      try {
        let res = await app.getDictData('LECTURE', false)
        const grade = res.data.find(v => v.key === 'gradeId')
        if (grade) this.gradeList = grade.list
        const product = res.data.find(v => v.key === 'productCode')
        if (product) this.productList = product.list
        const courseType = res.data.find(v => v.key === 'courseTypeId')
        if (courseType) this.courseTypeList = courseType.list
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>

<style>
.p-knowledge-set {
  padding: 20px;
}
</style>
