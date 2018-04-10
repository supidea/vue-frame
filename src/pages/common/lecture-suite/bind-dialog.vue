<template>
  <el-dialog custom-class="m-dialog" title="讲义套件绑定" :visible.sync="visible" :before-close="close" center>
    <div class="lecture-suite-bind-dialog__car l-mb" :class="{'is-selected': selectedDataName}" :title="selectedDataName">{{selectedDataName || '未选中任何讲义或试卷'}}</div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane :label="value" :name="key" v-for="(value, key) in types" :key="key"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component :is="activeName" ref="tb" v-bind="$attrs" :select="select" :selected-data="selectedData"></component>
    </keep-alive>
    <div slot="footer">
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button size="mini" type="primary" @click="submit" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import vLecture from './bind-lecture'
import vPaper from './bind-paper'
import { lecture } from '../../../api'
export default {
  components: {
    LECTURE: vLecture,
    PAPER: vPaper
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: 'LECTURE',
      selectedData: {},
      loading: false
    }
  },
  computed: {
    ...mapState({
      types: state => state.app.types
    }),
    selectedDataName() {
      if (!this.selectedData.id) return ''
      if (this.selectedData.lectureId) return this.convertLectureName(this.selectedData)
      return this.convertPaperName(this.selectedData)
    }
  },
  methods: {
    close() {
      this.selectedData = {}
      this.$emit('update:visible', false)
    },
    select(val) {
      this.selectedData = val
    },
    async submit() {
      this.loading = true
      try {
        let res = await lecture.bindLectureSuite({
          templateId: this.data.id,
          refId: this.selectedData.id,
          refType: this.activeName,
          bindStatus: 'BIND'
        })
        this.$emit('bind-success', res.data)
        this.close()
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    convertLectureName(lectureObj) {
      let { name, gradeName, courseTypeName, regionName } = lectureObj
      let arr = []
      if (gradeName) {
        gradeName = '年级：' + gradeName
        arr.push(gradeName)
      }
      if (courseTypeName) {
        courseTypeName = '课程类型' + courseTypeName
        arr.push(courseTypeName)
      }
      if (regionName) {
        regionName = '知识体系：' + regionName
        arr.push(regionName)
      }
      let str = arr.join(',')
      if (arr.length > 0) str = '已选讲义：' + name + '（' + str + '）'
      return str
    },
    convertPaperName(paperObj) {
      let { paperName, grade, paperType, updateUser } = paperObj
      let arr = []
      if (grade) {
        grade = '年级：' + grade
        arr.push(grade)
      }
      if (paperType) {
        paperType = '试卷类型' + paperType
        arr.push(paperType)
      }
      if (updateUser) {
        updateUser = '更新人' + updateUser
        arr.push(updateUser)
      }
      let str = arr.join(',')
      if (arr.length > 0) str = '已选讲义：' + paperName + '（' + str + '）'
      return str
    }
  }
}
</script>

<style lang="less">
.lecture-suite-bind-dialog__car {
  border: 1px solid var(--border-color);
  line-height: 24px;
  height: 24px;
  padding: 10px 20px;
  color: var(--gray-light);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  &.is-selected {
    --border-color: var(--blue);
    --gray-light: var(--blue);
  }
}
</style>
