<template>
  <el-popover placement="right" width="280" trigger="hover">
    <p class="schedule-table-course__txt">
      <em>上课时间：</em><span>{{`${data.courseDate} ${data.startTime}-${data.endTime}`}}</span></p>
    <p class="schedule-table-course__txt">
      <em>上课地点：</em><span>{{data.branchName}}</span></p>
    <p class="schedule-table-course__txt" v-if="data.schedStatusName === '正'">
      <em>年级：</em><span>{{data.gradeName}}</span></p>
    <p class="schedule-table-course__txt">
      <em>学生名称：</em><span>{{data.studentName}}</span></p>
    <p class="schedule-table-course__txt">
      <em>学管师：</em><span>{{data.courseManagerName}}</span></p>
    <p class="schedule-table-course__txt" v-if="data.schedStatusName === '正'">
      <em>讲义套件：</em><span>{{data.lectureSuitName}}</span></p>
    <p class="schedule-table-course__txt" v-if="data.bandingFlag">
      <el-button type="primary" size="mini">查看</el-button>
      <el-button type="warning" size="mini" v-if="canDo" @click="unbind(data)">解除绑定</el-button>
    </p>
    <p class="schedule-table-course__txt" v-else-if="data.schedStatusName === '正' && canDo">
      <el-button type="primary" size="mini" @click="bind(data)">去绑定</el-button>
    </p>
    <span :style="{height: data.height, top: data.top, 'margin-left': ml + 'px', left: data.left}" class="schedule-table-course" :sign="data.schedStatusName" slot="reference" :class="{'is-bind': data.bandingFlag,'is-fix': data.schedStatusName === '预'}">
      <var>{{data.subjectName}}</var>
    </span>
  </el-popover>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    bind: Function,
    unbind: Function
  },
  computed: {
    ml() {
      if (this.data.pos === 0) {
        return 10
      } else {
        return this.data.pos * 34 + 10
      }
    },
    canDo() {
      let b = moment(`${this.data.courseDate} ${this.data.startTime}`)
      return moment().diff(b) < 0
    }
  }
}
</script>

<style lang="less">
.schedule-table-course {
  --w: 2em;
  width: var(--w);
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #daebff;
  border-radius: ~'calc(var(--w) / 2)';
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  &::before {
    width: var(--w);
    height: var(--w);
    line-height: var(--w);
    text-align: center;
    border-radius: 50%;
    content: attr(sign);
    background-color: var(--blue);
    color: #fff;
  }
  & > var {
    flex: 1;
    width: 1em;
    line-height: 1.2;
    display: flex;
    align-items: center;
    font-style: normal;
    padding: 4px 0;
  }
  &__txt {
    margin: 0;
    padding: 3px 0;
    font-size: 12px;
    display: flex;
    align-items: baseline;
    & > em {
      width: 65px;
      text-align: right;
      margin-right: 5px;
      font-style: normal
    }
    & > span{
      flex: 1;
    }
  }
  &.is-bind {
    background: #a7f1e0;
  }
  &.is-fix {
    background: #ffe7c3;
    &::before {
      background: #fcb444;
    }
  }
}
</style>
