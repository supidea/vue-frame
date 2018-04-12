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
      <v-table :current-date="currentDate" :start-time="startTime" :end-time="endTime" :days="days" />
      <div class="schedule-table-course__wrap" v-loading="loading" element-loading-text="拼命加载中">
        <v-course v-for="item in courseList" :data="item" :key="item.teacherId" :start-time="startTime" :end-time="endTime" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import vTable from './table'
import vDate from './date'
import vCourse from './course'
import { user } from '../../api'
import { debounce } from '../../utils'
export default {
  components: {
    vTable,
    vCourse,
    vDate
  },
  data() {
    return {
      currentDate: moment().format('YYYY-MM-DD'),
      daysSize: 7,
      courseList: [],
      loading: false,
      startTime: '8:00',
      endTime: '24:00'
    }
  },
  computed: {
    startDate() {
      return moment(this.currentDate)
        .startOf('isoWeek')
        .format('YYYY-MM-DD')
    },
    endDate() {
      return moment(this.startDate)
        .add(this.daysSize - 1, 'd')
        .format('YYYY-MM-DD')
    },
    timeSize() {
      const st = moment(this.startTime, 'HH:mm').valueOf()
      const et = moment(this.endTime, 'HH:mm').valueOf()
      const dis = et - st
      return dis
    },
    days() {
      let arr = []
      for (let i = 0; i < this.daysSize; i++) {
        let date = moment(this.startDate)
          .add(i, 'd')
          .format('YYYY-MM-DD')
        arr.push(date)
      }
      return arr
    }
  },
  watch: {
    currentDate: debounce(
      function(val) {
        this.getSchedule()
      },
      300,
      false
    )
  },
  created() {
    let l = moment('17:30', 'HH:mm')
    let r = moment('22:00', 'HH:mm')
    console.log(r.diff(l, 'hour', true))
    this.getSchedule()
  },
  methods: {
    toToday() {
      this.currentDate = moment().format('YYYY-MM-DD')
    },
    prev() {
      let mom = moment(this.currentDate).subtract(this.daysSize, 'd')
      this.currentDate = mom.valueOf()
    },
    next() {
      let mom = moment(this.currentDate).add(this.daysSize, 'd')
      this.currentDate = mom.valueOf()
    },
    // 获取日程表数据
    async getSchedule() {
      this.loading = true
      try {
        let res = await user.getSchedule(this.startDate, this.endDate)
        this.courseList = this.convertData(res.data)
        // console.log(this.courseList)
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },
    convertData(arr) {
      let temp = []
      this.days.forEach(v => {
        const rest = arr.filter(p => p.courseDate === v)
        const nArr = this.sortCourse(rest)
        console.log(nArr)
        temp = [...temp, ...nArr]
      })
      return temp.map((v, i) => {
        v.height = this.computedHeight(v.startTime, v.endTime)
        v.top = this.computedTop(v.startTime)
        v.left = this.computedLeft(v.courseDate)
        return v
      })
    },
    sortCourse(arr) {
      if (arr.length === 0) return []
      arr[0].pos = 0
      if (arr.length === 1) {
        return arr
      }
      for (let i = 1; i < arr.length; i++) {
        // let j = i - 1
        let startTimeA = arr[i].startTime
        let endTimeA = arr[i].endTime
        for (var j = 0; j < i; j++) {
          let startTimeB = arr[j].startTime
          let endTimeB = arr[j].endTime
          let bol = this.hasTimeIntersection(
            startTimeA,
            endTimeA,
            startTimeB,
            endTimeB
          )
          if (bol) {
            if (!arr[i].pos) {
              arr[i].pos = arr[j].pos
            }
          } else {
            arr[i].pos = arr[j].pos + 1
          }
        }
      }
      return arr
    },
    // 计算课次块的高度
    computedHeight(st = 0, et = 0) {
      const l = moment(st, 'HH:mm').valueOf()
      const r = moment(et, 'HH:mm').valueOf()
      const dis = (r - l) * 100 / this.timeSize
      return dis + '%'
    },
    // 计算课次块的top
    computedTop(st = 0) {
      const l = moment(this.startTime, 'HH:mm').valueOf()
      const r = moment(st, 'HH:mm').valueOf()
      const dis = (r - l) * 100 / this.timeSize
      return dis + '%'
    },
    // 计算课次块的left
    computedLeft(day) {
      const l = moment(this.startDate)
      const r = moment(day)
      let diff = r.diff(l, 'days', true)
      return diff * 100 / this.daysSize + '%'
    },
    // 两个时间段是否有交集
    hasTimeIntersection(startTimeA, endTimeA, startTimeB, endTimeB) {
      let stA = moment(startTimeA, 'HH:mm').valueOf()
      let etA = moment(endTimeA, 'HH:mm').valueOf()
      let stB = moment(startTimeB, 'HH:mm').valueOf()
      let etB = moment(endTimeB, 'HH:mm').valueOf()
      return stA >= etB || stB >= etA
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
