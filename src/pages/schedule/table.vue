<template>
  <section class="schedule-table">
    <ul class="schedule-table-row">
      <li>时间段</li>
      <li v-for="day in days" :key="day" :class="{'is-today': day === today}">{{day|formatDate}}</li>
    </ul>
    <ul class="schedule-table-row" v-for="item in timeList" :key="item">
      <li>{{item}}</li>
      <li v-for="n in days" :key="n"></li>
    </ul>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    currentDate: {
      type: [String, Number],
      default: Date.now()
    },
    startTime: {
      type: String,
      default: '8:00'
    },
    endTime: {
      type: String,
      default: '24:00'
    },
    days: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    timeList() {
      let startTimeNum = this.startTime.split(':')[0]
      let endTimeNum = this.endTime.split(':')[0]
      let dis = endTimeNum - startTimeNum
      const arr = []
      for (let i = 0; i < dis; i++) {
        let nTime = parseInt(startTimeNum) + i
        if (nTime < 10) nTime = '0' + nTime
        arr.push(`${nTime}:00`)
      }
      return arr
    },
    today() {
      return moment().format('YYYY-MM-DD')
    }
  },
  filters: {
    formatDate(val) {
      let date = moment(val)
      let weeks = ['日', '一', '二', '三', '四', '五', '六']
      let day = date.format('MM月DD号')
      let week = date.format('d')
      return `周${weeks[week]} (${day})`
    }
  }
}
</script>

<style lang="less">
.schedule-table {
  --h: 60px;
  border-width: 1px 0 0 1px;
  border-color: var(--border-color);
  border-style: solid;
  &-row {
    display: flex;
    margin: 0;
    padding: 0;
    & > li {
      &:first-child {
        width: 70px;
        flex: none;
        background-color: #f5f5f5;
      }
      flex: 1;
      list-style: none;
      height: var(--h);
      line-height: var(--h);
      box-sizing: border-box;
      border-width: 0 1px 1px 0;
      border-color: var(--border-color);
      border-style: solid;
      background: #fff;
      text-align: center;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      &.is-today{
        color: var(--red);
      }
    }
    &:first-child {
      & > li {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
