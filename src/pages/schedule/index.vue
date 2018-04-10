<template>
  <div>
    <div class="schedule-table-header l-mb">
      <div class="left">
        <el-button @click="toToday" size="small">返回今天</el-button>
        <el-button icon="el-icon-arrow-left" @click="prev" size="small"></el-button>
        <v-date v-model="currentDate" style="margin: 0 8px" />
        <el-button icon="el-icon-arrow-right" @click="next" size="small"></el-button>
      </div>
      <div class="right schedule-table-chunk">
        <span class="is-reserve">预排课次</span>
        <span class="is-bind">已绑讲义课次</span>
        <span>未绑讲义课次</span>
      </div>
    </div>
    <div class="schedule-table__wrap">
      <v-table :current-date="currentDate" :days-size="7" />
      <el-popover ref="popover" placement="right" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      </el-popover>
      <div class="schedule-table-course__wrap">
        <v-course v-popover:popover />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import vTable from './table'
import vDate from './date'
import vCourse from './course'
export default {
  components: {
    vTable,
    vCourse,
    vDate
  },
  data() {
    return {
      currentDate: Date.now(),
      daysSize: 7
    }
  },
  methods: {
    toToday() {
      this.currentDate = Date.now()
    },
    prev() {
      let mom = moment(this.currentDate).subtract(this.daysSize, 'd')
      this.currentDate = mom.valueOf()
    },
    next() {
      let mom = moment(this.currentDate).add(this.daysSize, 'd')
      this.currentDate = mom.valueOf()
    }
  }
}
</script>

<style lang="less">
.schedule-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.schedule-table-chunk {
  & > span {
    display: inline-flex;
    align-items: center;
    margin-left: 20px;
    &::before {
      width: 14px;
      height: 14px;
      content: '';
      display: block;
      background: #daebff;
      margin-right: 8px;
      border: var(--border);
    }
    &.is-reserve::before {
      background: #ffe7c3;
    }
    &.is-bind::before {
      background: #a7f1e0;
    }
  }
}
.schedule-table__wrap {
  position: relative;
}
.schedule-table-course {
  &__wrap {
    position: absolute;
    top: 60px;
    left: 70px;
    right: 0;
    bottom: 0;
  }
}
</style>
