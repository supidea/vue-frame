<template>
  <div class="box-wrap">
    <div class="box-con" ref="con">
      <div class="ixx">1</div>
      <div class="ixx">2</div>
      <div class="ixx">3</div>
      <div class="ixx">4</div>
    </div>
    <div class="box-side">
      <v-steps :data="list" :active="active" @handleChange="jump"></v-steps>
    </div>
  </div>
</template>

<script>
import vSteps from '../../components/steps'
import { throttle } from '../../utils'
export default {
  components: {
    vSteps
  },
  data() {
    return {
      list: ['知识引入', '图狂', '知识清单', '知识精讲', '练习题'],
      active: 0,
      stepsElesHeightArr: [],
      scrollBox: null,
      timer: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      let eles = document.documentElement.querySelectorAll('.ixx')
      this.scrollBox = document.documentElement.querySelector('.l-main')
      let ot = this.scrollBox.offsetTop
      Array.prototype.forEach.call(eles, item => {
        let h = item.offsetTop + ot
        this.stepsElesHeightArr.push(h)
      })
      this.scrollBox.addEventListener(
        'scroll',
        throttle(
          () => {
            this.active = this.getIndex(this.stepsElesHeightArr, this.scrollBox.scrollTop)
          },
          100,
          100
        )
      )
    })
  },
  methods: {
    getIndex(arr, num) {
      let len = arr.length, index = 0
      if (len <= 0) return 0
      if (arr[len - 1] <= num) return len - 1
      for (var i = 0; i < len - 1; i++) {
        if (arr[i] <= num && arr[i + 1] > num) {
          index = i
          break
        }
      }
      return index
    },
    jump(val) {
      let st = val === 0 ? 0 : this.stepsElesHeightArr[val]
      this.bufferMove(this.scrollBox, st)
    },
    bufferMove(ele, target) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let iSpeed = (target - ele.scrollTop) / 12
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
        if (ele.scrollTop === target) {
          clearInterval(this.timer)
        } else {
          ele.scrollTop = ele.scrollTop + iSpeed
        }
      }, 30)
    }
  }
}
</script>

<style lang="less">
.ixx {
  height: 600px;
}
.box-wrap {
  margin: 0 auto;
  width: 1100px;
  display: flex;
  justify-content: space-between;
}
.box-con {
  width: 210mm;
  height: 3000px;
  background-color: #fff;
  padding: 20px;
  position: relative;
}
.box-side {
  width: 220px;
  .m-steps {
    position: fixed;
  }
}
</style>
