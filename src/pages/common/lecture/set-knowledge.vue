<template>
  <div class="p-knowledge-set m-box">
    <el-form ref="form" :v-model="form" :rules="rules" size="mini" label-width="90px">
      <el-form-item label="讲义名称" prop="lectureName">
        <el-input v-model="form.lectureName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="gradeId">
        <el-select v-model="form.gradeId" placeholder="请选择" style="width: 300px" @change="changeGrade">
          <el-option :label="item.label" :value="item.code" v-for="item in gradeList" :key="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品线" prop="productCode">
        <el-radio-group v-model="form.productCode">
          <el-radio :label="item.code" v-for="item in productList" :key="item.code">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="课程类型" prop="courseTypeId">
        <el-radio-group v-model="form.courseTypeId">
          <el-radio :label="item.code" v-for="item in courseTypeList" :key="item.code">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设定知识点" prop="pointIds">
        <el-button size="mini" icon="el-icon-plus" @click="showDialog">添加知识点</el-button>
        <v-table border :data="tableData" :columns="columns" class="l-mt" size="mini" />
      </el-form-item>
    </el-form>
    <div class="l-mt l-tac">
      <el-button type="primary" size="small" @click="handlerSubmit">下一步</el-button>
      <el-button type="primary" size="small">跳过框图、知识编辑步骤</el-button>
      <el-button size="small">取消</el-button>
    </div>
    <!-- 选择知识点弹框 -->
    <v-knowledge-dialog :visible.sync="visibleDialog" :grade-id="form.gradeId" :default-checked-keys="defaultCheckedKeys" @handler-select="hanlderSelect" />
  </div>
</template>

<script>
import vKnowledgeDialog from './checked-knowledge-dialog'
import vTable from '../../../components/table'
import columns from './columns'
import { app } from '../../../api'
export default {
  components: {
    vTable,
    vKnowledgeDialog
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: columns(this),
      gradeList: [],
      productList: [],
      courseTypeList: [],
      form: {
        lectureName: '',
        productCode: '',
        courseTypeId: '',
        gradeId: '',
        pointIds: []
      },
      tableData: [],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      visibleDialog: false
    }
  },
  computed: {
    defaultCheckedKeys() {
      return this.tableData.map(v => v.nodeId)
    }
  },
  watch: {
    'data': {
      handler(val) {
        this.form.lectureName = val.lectureName
        this.form.productCode = val.productCode
        this.form.courseTypeId = val.courseTypeId
        this.form.gradeId = val.gradeId
        this.tableData = val.lecturePointRequire
      },
      deep: true
    },
    'tableData': {
      handler(val) {
        this.form.pointIds = val.map(v => v.nodeId)
      },
      deep: true
    }
  },
  mounted() {
    this.getDictData()
  },
  methods: {
    // 获取年级、产品线、课程类型的下拉列表
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
    },
    showDialog() {
      this.visibleDialog = true
    },
    hanlderSelect(val) {
      this.tableData = val
    },
    // 改变年级
    async changeGrade(val) {
      try {
        await this.$confirm('此操作将删除已选定的知识点,是否继续', {
          type: 'warning'
        })
        this.tableData = []
      } catch (e) {}
    },
    // 创建讲义或编辑讲义
    handlerSubmit() {
      console.log(this.form)
    }
  }
}
</script>

<style>
.p-knowledge-set {
  padding: 20px;
}
</style>
