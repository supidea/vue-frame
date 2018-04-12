<template>
  <el-popover placement="right" width="280" trigger="hover">
    <p class="schedule-table-course__txt">
      <span>上课时间：</span>{{`${data.courseDate} ${data.startTime}-${data.endTime}`}}</p>
    <p class="schedule-table-course__txt">
      <span>上课地点：</span>{{data.branchName}}</p>
    <p class="schedule-table-course__txt" v-if="data.schedStatusName === '正'">
      <span>年级：</span>{{data.gradeName}}</p>
    <p class="schedule-table-course__txt">
      <span>学生名称：</span>{{data.studentName}}</p>
    <p class="schedule-table-course__txt">
      <span>学管师：</span>{{data.courseManagerName}}</p>
    <p class="schedule-table-course__txt" v-if="data.schedStatusName === '正'">
      <span>讲义套件：</span>{{data.lectureSuitName}}</p>
    <p class="schedule-table-course__txt" v-if="data.bandingFlag">
      <el-button type="primary" size="mini">查看</el-button>
      <el-button type="warning" size="mini">解除绑定</el-button>
    </p>
    <p class="schedule-table-course__txt" v-else-if="data.schedStatusName === '正'">
      <el-button type="primary" size="mini">去绑定</el-button>
    </p>
    <span :style="{height: data.height, top: data.top, 'margin-left': ml + 'px', left: data.left}" class="schedule-table-course" :sign="data.schedStatusName" slot="reference" :class="{'is-bind': data.bandingFlag,'is-fix': data.schedStatusName === '预'}">
      <var>{{data.subjectName}}</var>
    </span>
  </el-popover>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ml() {
      if (this.data.pos === 0) {
        return 10
      } else {
        return this.data.pos * 34 + 10
      }
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
    & > span {
      width: 65px;
      text-align: right;
      margin-right: 5px;
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
