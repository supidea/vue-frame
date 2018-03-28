<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="100px">
      <el-form-item label="讲义名称:" prop="lectureName">
        <el-input v-model="ruleForm.lectureName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="年级:" prop="gradeId">
        <el-select v-model="ruleForm.gradeId" placeholder="请选择" style="width: 300px" @change="changeGrade">
          <el-option :label="item.label" :value="item.code" v-for="item in gradeList" :key="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品线:" prop="productCode">
        <el-radio-group v-model="ruleForm.productCode">
          <el-radio :label="item.code" v-for="item in productList" :key="item.code">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="课程类型:" prop="courseTypeId">
        <el-radio-group v-model="ruleForm.courseTypeId">
          <el-radio :label="item.code" v-for="item in courseTypeList" :key="item.code">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设定知识点:" prop="pointIds">
        <el-button size="mini" icon="el-icon-plus" @click="openDialog">添加知识点</el-button>
        <v-table border :data="tableData" :columns="columns" class="l-mt l-mb" size="mini"/>
      </el-form-item>
    </el-form>
    <div class="l-mt l-tac">
      <el-button type="primary" size="small" @click="handlerSubmit" :loading="loading">下一步</el-button>
      <el-button type="primary" size="small" :loading="loading">跳过框图、知识编辑步骤</el-button>
      <el-button size="small">取消</el-button>
    </div>
    <!-- 选择知识点弹框 -->
    <v-knowledge-dialog :visible.sync="visibleDialog" :grade-id="ruleForm.gradeId" :default-checked-keys="defaultCheckedKeys" @handler-select="hanlderSelect" />
  </div>
</template>

<script>
import vKnowledgeDialog from './checked-knowledge-dialog'
import vTable from '../../../components/table'
import columns from './columns'
import { app, lecture } from '../../../api'
export default {
  components: {
    vTable,
    vKnowledgeDialog
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      columns: columns(this),
      gradeList: [],
      productList: [],
      courseTypeList: [],
      ruleForm: {
        lectureName: this.data.lectureName,
        productCode: this.data.productCode,
        courseTypeId: this.data.courseTypeId,
        gradeId: this.data.gradeId,
        pointIds: []
      },
      tableData: this.data.lecturePointRequire,
      rules: {
        lectureName: [
          { required: true, message: '请输入讲义名称', trigger: 'blur' }
        ],
        gradeId: [
          { type: 'number', required: true, message: '请选择年级', trigger: 'change' }
        ],
        productCode: [
          { required: true, message: '请选择产品线', trigger: 'change' }
        ],
        courseTypeId: [
          { type: 'number', required: true, message: '请选择课程类型', trigger: 'change' }
        ],
        pointIds: [
          { type: 'array', required: true, message: '至少设定一个知识点', trigger: 'change' }
        ]
      },
      visibleDialog: false,
      loading: false
    }
  },
  computed: {
    defaultCheckedKeys() {
      return this.tableData.map(v => v.nodeId)
    }
  },
  watch: {
    'tableData': {
      handler(val) {
        this.ruleForm.pointIds = val.map(v => v.nodeId)
      },
      deep: true
    }
  },
  created() {
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
    // 打开知识点选择框
    openDialog() {
      this.visibleDialog = true
    },
    hanlderSelect(val) {
      this.tableData = val
    },
    // 改变年级
    async changeGrade(val) {
      try {
        await this.$confirm('此操作将清空已选定的知识点,是否继续', {
          type: 'warning'
        })
        this.tableData = []
      } catch (e) {}
    },
    // 创建讲义或编辑讲义
    handlerSubmit() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.updateLecture()
        } else {
          return false
        }
      })
    },
    // 创建或编辑讲义
    async updateLecture() {
      this.loading = true
      try {
        let res = await lecture.updateLecture({lectureId: this.data.lectureId, ...this.ruleForm})
        console.log(res)
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 删除知识点
    async remove(item) {
      try {
        await this.$confirm('此操作将删除已选定的知识点,是否继续', {
          type: 'warning'
        })
        this.tableData.splice(item.$index, 1)
      } catch (e) {}
    }
  }
}
</script>
