<template>
  <section class="lecture-suite-header">
    <div class="title" :class="{'is-edit': isEdit}" ref="tit" :contenteditable="isEdit" @focus="handleFocus" @blur="handleBlur"></div>
    <div class="subject">{{gradeName}}
      <span>|</span>{{subjectName}}</div>
  </section>
</template>

<script>
import { lecture } from '../../../api'
export default {
  props: {
    name: String,
    gradeName: String,
    subjectName: String,
    isEdit: Boolean
  },
  data() {
    return {
      cls: 'edit' + Date.now()
    }
  },
  watch: {
    name() {
      this.initData()
    }
  },
  methods: {
    initData() {
      let sHtml = this.name || ''
      if (this.isEdit) {
        sHtml = sHtml.trim() + `<span class="${this.cls}">(点击编辑)</span>`
      }
      this.$nextTick(() => {
        this.$refs.tit.innerHTML = sHtml
      })
    },
    handleFocus() {
      this.$nextTick(() => {
        this.removeTipsNode()
      })
    },
    handleBlur() {
      this.$nextTick(async () => {
        let txt = this.$refs.tit.innerText.trim()
        this.$emit('update:name', txt)
        this.addTipsNode()
        await this.updateName(this.$route.params.id, txt)
      })
    },
    addTipsNode() {
      let node = document.createElement('span')
      node.className = this.cls
      node.innerText = '(点击编辑)'
      this.$refs.tit.appendChild(node)
    },
    removeTipsNode() {
      let child = document.documentElement.querySelector('.' + this.cls)
      child && this.$refs.tit.removeChild(child)
    },
    async updateName(id, name) {
      if (name === '') {
        return this.$message.error('讲义套件名称不能为空，请重新输入！')
      }
      if (name.length > 50) {
        return this.$message.error(
          '讲义套件名称长度不能超过50个字符，请重新输入！'
        )
      }
      try {
        await lecture.updateLectureSuiteName({ id, name })
      } catch (e) {
        this.$message.error(e)
      }
    }
  }
}
</script>

<style lang="less">
.lecture-suite-header {
  text-align: center;
  & > .title,
  & > .subject {
    line-height: 50px;
    padding: 0 20px;
  }
  & > .title {
    outline: none;
    font-size: 16px;
    &.is-edit {
      border: 1px dashed #aaa;
    }
    &.is-edit:focus {
      border: 1px solid var(--blue);
    }
    & > span {
      color: var(--gray-lighter);
    }
  }
  & > .subject {
    font-size: 14px;
    & > span {
      margin: 0 15px;
    }
  }
}
</style>
