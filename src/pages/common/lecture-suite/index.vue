<template>
  <div class="lecture-suite">
    <div class="lecture-suite-wrap">
      <v-step class="l-mb" :data="steps" :select="addStep"/>
      <v-content :data="info.templateList">
        <template slot-scope="scope">
          <span @click="openDialog">绑定</span>
          <span @click="removeStep(scope)">删除</span>
        </template>
      </v-content>
    </div>
    <v-dialog :visible.sync="dialogVisible"/>
  </div>
</template>

<script>
import vContent from './content'
import vDialog from './bind-dialog'
import vStep from './step'
import { mapState, mapActions } from 'vuex'
import { lecture } from '../../../api'
export default {
  components: {
    vContent,
    vDialog,
    vStep
  },
  data() {
    return {
      info: {},
      dialogVisible: false
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
    ...mapActions([
      'getTeacherSteps'
    ]),
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
        await lecture.addLectureSuiteModule({lecturesuitId: this.lecturesuitId, teachingStepsId: item.code})
        await this.getLectureSuiteDetail(this.lecturesuitId)
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 删除讲义套件教学模块
    async removeStep(scope) {
      try {
        await this.$confirm('此操作将永久删除该教学步骤，是否继续?', { type: 'warning' })
        await lecture.removeLectureSuiteModule(scope.row.id)
        this.info.templateList.splice(scope.index, 1)
      } catch (e) {
        if (e !== 'cancel') this.$message.error(e)
      }
    },
    openDialog() {
      this.dialogVisible = true
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
}
</style>
