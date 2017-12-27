<template>
  <div class="teacher-schedule">
    <div class="teacher-schedule__hd">
      <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1161209730,2018761545&fm=27&gp=0.jpg" alt="" class="teacher-schedule-avatar">
      <div class="teacher-schedule-profile">
        <h3 class="teacher-schedule-profile__name">张婷婷老师的日程安排</h3>
        <p class="teacher-schedule-profile__des">厦门地区个性化团队
          <span class="teacher-schedule-profile__spit">|</span>数学</p>
      </div>
    </div>
    <div class="teacher-schedule__bd">
      <div class="teacher-schedule-days">
        <el-button @click="toToday">返回今天</el-button>
        <el-button icon="el-icon-arrow-left" @click="prev"></el-button>
        <v-date style="margin: 0 8px" v-model="startDate" />
        <el-button icon="el-icon-arrow-right" @click="next"></el-button>
      </div>
      <div class="teacher-schedule-table">
        <ul class="teacher-schedule-table__row teacher-schedule-table__head">
          <li class="teacher-schedule-table__col is-time">时间段</li>
          <li class="teacher-schedule-table__col" v-for="day in days" :key="day">{{day|formatDate}}</li>
        </ul>
        <ul class="teacher-schedule-table__row teacher-schedule-table__item" v-for="n in 17" :key="n">
          <li class="teacher-schedule-table__col is-time">{{6+n}}:00</li>
          <li class="teacher-schedule-table__col"></li>
          <li class="teacher-schedule-table__col"></li>
          <li class="teacher-schedule-table__col"></li>
          <li class="teacher-schedule-table__col"></li>
          <li class="teacher-schedule-table__col"></li>
          <li class="teacher-schedule-table__col"></li>
          <li class="teacher-schedule-table__col"></li>
        </ul>
        <schedule-course :is-reserve="false" height="200px" top="100px" left="200px" />
        <schedule-course :is-reserve="false" :has-bind="true" height="100px" top="200px" left="1400px" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import vDate from './components/date'
import ScheduleCourse from './components/schedule-course'
export default {
  data() {
    return {
      startDate: new Date(),
      daysSize: 7
    }
  },
  computed: {
    days() {
      let arr = []
      for (let i = 0; i < this.daysSize; i++) {
        let date = moment(this.startDate).add(i, 'd').format()
        arr.push(date)
      }
      return arr
    }
  },
  methods: {
    toToday() {
      this.startDate = new Date()
    },
    prev() {
      this.startDate = moment(this.startDate).subtract(7, 'd')
    },
    next() {
      this.startDate = moment(this.startDate).add(7, 'd')
    },
    changeDate() {
      this.$refs['datePicker'].showPicker()
    }
  },
  filters: {
    formatDate(val) {
      let date = moment(val)
      let weeks = ['日', '一', '二', '三', '四', '五', '六']
      let day = date.format('MM月DD号')
      let week = date.format('d')
      return `周${weeks[week]}（${day}）`
    }
  },
  components: {
    ScheduleCourse,
    vDate
  }
}
</script>

<style lang="less">
@import '../../assets/styles/variables.less';
.teacher-schedule {
  background: #fff;
  padding: 30px;
  border: 1px solid @baseBorderColor;
  &__hd {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  &-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  &-profile {
    margin-left: 15px;
    &__name {
      font-size: 16px;
      margin: 0 0 10px 0;
      font-weight: normal;
    }
    &__des {
      font-size: 12px;
      margin: 0;
      color: @grayLight;
    }
    &__spit {
      margin: 0 8px;
    }
  }
  &__bd {
    border-top: 1px solid @baseBorderColor;
    padding-top: 30px;
  }
  &-days {
    margin-bottom: 20px;
  }
  &-table {
    border-width: 1px 0 0 1px;
    border-style: solid;
    border-color: @baseBorderColor;
    position: relative;
    &__row {
      padding: 0;
      list-style: none;
      display: flex;
      margin: 0;
    }
    &__col {
      flex: 1;
      height: 30px;
      line-height: 30px;
      border-width: 0 1px 1px 0;
      border-style: solid;
      border-color: @baseBorderColor;
      padding: 10px;
      &.is-time {
        width: 120px;
        flex: none;
        background: #f6f7fb;
      }
    }
    &__head {
      background: #f6f7fb;
      text-align: center;
      font-size: 14px;
    }
    &__item &__col {
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>
