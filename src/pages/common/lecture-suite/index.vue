<template>
  <div class="lecture-suite">
    <div class="lecture-suite-wrap">
      <v-header class="l-mb" :name.sync="info.name" :grade-name="info.gradeName" :subject-name="info.subjectName" :is-edit="isEdit" />
      <v-step class="l-mb" :data="steps" :select="addStep" v-if="isEdit" />
      <v-content :data="info.templateList">
        <template slot-scope="scope">
          <div class="lecture-suite-opera">
            <i @click="openDialog(scope)" class="iconfont icon-chakan" v-if="scope.row.bindStatus === 'BIND'" title="查看"></i>
            <i @click="handlerUnbind(scope.row)" class="iconfont icon-jiebang" v-if="isEdit && scope.row.bindStatus === 'BIND'" title="解绑"></i>
            <i @click="openDialog(scope)" class="iconfont icon-bangding" v-if="isEdit && scope.row.bindStatus === 'UNBOUND'" title="绑定"></i>
            <i @click="removeStep(scope)" class="iconfont icon-shanchu" title="删除" v-if="isEdit"></i>
          </div>
        </template>
      </v-content>
      <div class="l-tac" v-if="isEdit" style="margin-top: 80px">
        <el-button type="primary" size="small" @click="submit" :loading="loading">提交</el-button>
        <p class="lecture-suite-submit__tips">点击提交前，系统已为您自动保存至草稿箱</p>
      </div>
    </div>
    <v-dialog :grade-id="info.gradeId" :data="selectedData" @bind-success="handlerBind" :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import vContent from './content'
import vDialog from './bind-dialog'
import vStep from './step'
import vHeader from './header'
import { mapState, mapActions } from 'vuex'
import { lecture } from '../../../api'
export default {
  props: ['isEdit'],
  components: {
    vContent,
    vDialog,
    vHeader,
    vStep
  },
  data() {
    return {
      info: {},
      dialogVisible: false,
      selectedData: {},
      loading: false
    }
  },
  computed: {
    ...mapState({
      steps: state => state.app.tearchSteps
    }),
    lecturesuitId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getLectureSuiteDetail(this.lecturesuitId)
    this.steps.length === 0 && this.getTeacherSteps()
  },
  methods: {
    ...mapActions(['getTeacherSteps']),
    // 获取讲义套件信息
    async getLectureSuiteDetail(id) {
      try {
        let res = await lecture.getLectureSuiteDetail(id)
        this.info = res.data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 添加讲义套件教学模块
    async addStep(item) {
      try {
        await lecture.addLectureSuiteModule({
          lecturesuitId: this.lecturesuitId,
          teachingStepsId: item.code
        })
        await this.getLectureSuiteDetail(this.lecturesuitId)
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 删除讲义套件教学模块
    async removeStep(scope) {
      try {
        await this.$confirm('此操作将永久删除该教学步骤，是否继续?', {
          type: 'warning'
        })
        await lecture.removeLectureSuiteModule(scope.row.id)
        this.info.templateList.splice(scope.index, 1)
      } catch (e) {
        if (e !== 'cancel') this.$message.error(e)
      }
    },
    // 打开绑定窗口
    openDialog(data) {
      this.selectedData = data.row
      this.dialogVisible = true
    },
    // 绑定成功后回调
    handlerBind(val) {
      if (!this.info.templateList) return false
      let item = this.info.templateList.find(v => v.id === val.id)
      Object.assign(item, val)
    },
    // 解除绑定
    async handlerUnbind(data) {
      try {
        await this.$confirm(
          `<p class="m-confirm__tit">确定解除《${
            data.templateName
          }》与教学步骤的绑定关系？</p><p class="m-confirm__con">解绑后可重新绑定</p>`,
          {
            dangerouslyUseHTMLString: true,
            type: 'warning'
          }
        )
        let res = await lecture.bindLectureSuite({
          templateId: data.id,
          refType: data.refType,
          refId: data.refId,
          bindStatus: 'UNBOUND'
        })
        Object.assign(data, res.data)
      } catch (e) {
        if (e !== 'cancel') this.$message.error(e)
      }
    },
    async submit() {
      let name = this.info.name || ''
      name = name.trim()
      if (name === '') {
        return this.$message.error('讲义套件名称不能为空，请重新输入！')
      }
      if (name.length > 50) {
        return this.$message.error(
          '讲义套件名称长度不能超过50个字符，请重新输入！'
        )
      }
      if (!this.hasAllStepsBinded()) {
        return this.$confirm(
          `<p class="m-confirm__tit">未添加模块或有模块未绑定，请先完成操作！</p>` +
            `<p class="m-confirm__con">点击确定，此讲义套件将会移至草稿箱！</p>`,
          {
            dangerouslyUseHTMLString: true,
            type: 'warning'
          }
        ).then(() => {
          this.$router.push({
            name: 'My_Draft_Lecture-suite'
          })
        })
      }
      this.updateLectureSuite()
    },
    // 判断讲义套件是否绑定讲义或试卷
    hasAllStepsBinded() {
      if (this.info.templateList && this.info.templateList.length === 0) {
        return false
      }
      return this.info.templateList.every(v => v.refId)
    },
    // 更新讲义套件
    async updateLectureSuite() {
      this.loading = true
      try {
        await lecture.updateLectureSuite(this.$route.params.id)
        this.$router.push({
          name: 'My_Group_Lecture-suite'
        })
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.lecture-suite {
  padding: 40px 0;
  &-wrap {
    margin: 0 auto;
    width: 210mm;
    padding: 40px;
    background: #fff;
  }
  &-opera {
    display: inline-flex;
    & > i {
      cursor: pointer;
      font-size: 14px;
      transition: 0.3s color ease-in-out;
      background: #ecf5ff;
      color: var(--blue);
      &:hover {
        color: var(--red);
      }
    }
    & > i + i {
      margin-left: 10px;
    }
  }
  &-submit__tips {
    color: var(--gray-lighter);
  }
}
</style>
