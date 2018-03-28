<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" size="mini" label-width="100px">
      <el-form-item label="知识引入:">
        <div></div>
        <el-button size="mini" icon="el-icon-plus">添加知识引入</el-button>
      </el-form-item>
      <el-form-item label="框图:">
        <el-button size="mini" icon="el-icon-upload2">点击上传框图</el-button>
      </el-form-item>
    </el-form>
    <div class="l-mt l-tac">
      <el-button type="primary" size="small">上一步</el-button>
      <el-button type="primary" size="small">下一步</el-button>
      <el-button type="primary" size="small">跳过知识编辑步骤</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      ruleForm: {

      }
    }
  }
}
</script>
