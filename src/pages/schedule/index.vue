<template>
  <div>
    <div class="schedule-teacher-info">
      <img alt="" :src="avatar" class="avatar">
      <div class="profile">
        <h3 class="name">{{name}}老师的日程安排</h3>
        <p class="des">{{describe}}</p>
      </div>
    </div>
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
        <v-course v-for="item in courseList" :data="item" :key="item.teacherId" :start-time="startTime" :end-time="endTime" :bind="bind" :unbind="unbind"/>
      </div>
    </div>
    <v-dialog :visible.sync="visible" :data="selectedCourse" @bind-success="handlerBind"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import vTable from './table'
import vDate from './date'
import vCourse from './course'
import vDialog from './bind-dialog'
import { user, lecture } from '../../api'
import { debounce } from '../../utils'

export default {
  components: {
    vTable,
    vCourse,
    vDialog,
    vDate
  },
  data() {
    return {
      currentDate: moment().format('YYYY-MM-DD'),
      daysSize: 7,
      courseList: [],
      loading: false,
      startTime: '8:00',
      endTime: '24:00',
      visible: false,
      selectedCourse: {}
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
    },
    ...mapState({
      avatar: state => state.user.avatar,
      name: state => state.user.name,
      describe: state => state.user.describe
    })
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
    },
    // 弹出绑定窗口
    bind(data) {
      Object.assign(this.selectedCourse, data)
      this.visible = true
    },
    // 解除绑定
    async unbind(data) {
      try {
        const html = `<p class="m-confirm__tit">确定解除讲义《${data.lectureSuitName}》与课次的绑定关系？</p><p class="m-confirm__con">解绑后可重新绑定</p>`
        await this.$confirm(html, {dangerouslyUseHTMLString: true, type: 'warning'})
        await lecture.courseUnbindLectureSuite(data.bindRecordId)
        this.getSchedule()
      } catch (e) {
        e !== 'cancel' && this.$message.error(e)
      }
    },
    // 绑定成功后回调刷新页面
    handlerBind() {
      this.getSchedule()
    }
  }
}
</script>

<style lang="less">
.schedule-teacher-info{
  display: flex;
  align-items: center;
  border-bottom: var(--border);
  padding: 20px 0 30px;
  margin-bottom: 30px;
  & > .avatar{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & > .profile{
    margin-left: 20px;
    & > .name {
      font-size: 16px;
      padding: 0;
      margin: 0 0 10px 0;
      font-weight: normal;
      height: 30px;
      line-height: 30px;
    }
    & > .des {
      font-size: 12px;
      margin: 0;
      padding: 0;
      color: var(--gray-light);
      height: 20px;
      line-height: 20px;
    }
  }
}
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
