<template>
  <el-dialog :visible="visible" title="选择知识点" custom-class="m-dialog" center width="800px" :before-close="handleClose">
    <section class="checked-knowledge-dialog">
      <div class="left">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" class="l-mb">
        </el-input>
        <el-tree ref="tree" :data="data" @check="hanlderCheck" :filter-node-method="filterNode" :default-checked-keys="defaultCheckedKeys" :check-strictly="true" show-checkbox node-key="nodeId" :props="defaultProps">
        </el-tree>
      </div>
      <div class="right">
        <el-tag size="small" closable v-for="item in selectedPoints" :key="item.nodeId" @close="remove(item)">{{item.nodeName}}</el-tag>
      </div>
    </section>
    <div class="l-mt l-tac">
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="small" @click="handlerSelect" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { knowledge, lecture } from '../../../../api'
export default {
  props: {
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    gradeId: [Number, String]
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'nodeName'
      },
      filterText: '',
      selectedPoints: [],
      loading: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getPointTree({ gradeId: this.gradeId })
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 根据年级ID获取知识树
    async getPointTree(data) {
      try {
        let res = await knowledge.getPointTree(data)
        this.data = res.data.list || []
        this.$nextTick(() => {
          this.selectedPoints = this.$refs.tree.getCheckedNodes()
        })
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 选择知识点
    hanlderCheck(data, { checkedNodes }) {
      this.selectedPoints = checkedNodes
    },
    // 删除选择的知识点
    remove(node) {
      let index = this.selectedPoints.findIndex(v => v.nodeId === node.nodeId)
      index > -1 && this.selectedPoints.splice(index, 1)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(this.selectedPoints)
      })
    },
    handleClose() {
      this.$emit('update:visible', !this.visible)
    },
    // 选择的知识点获取考试要求列表
    async handlerSelect() {
      this.loading = true
      try {
        const pointIds = this.selectedPoints.map(v => v.nodeId)
        const res = await lecture.getLecturePointRequire(pointIds)
        const Ids = res.data.list || []
        this.$emit('handler-select', Ids)
        this.handleClose()
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    // 筛选知识点
    filterNode(value, data) {
      if (!value) return true
      return data.nodeName.indexOf(value.trim()) !== -1
    }
  }
}
</script>

<style lang="less">
.checked-knowledge-dialog {
  border: var(--border);
  display: flex;
  & > .left,
  & > .right {
    flex: 1;
    height: 350px;
    padding: 10px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: hsla(220, 4%, 58%, 0.2);
    }
  }
  & > .left {
    border-right: var(--border);
  }
  & > .right {
    & > .el-tag + .el-tag {
      margin-top: 5px;
    }
    & > .el-tag {
      position: relative;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 30px;
      & > .el-tag__close {
        position: absolute;
        right: 5px;
        top: 3px;
      }
    }
  }
}
</style>
