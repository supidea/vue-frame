<template>
  <div class="teacher-schedule-course" :class="{'is-reserve': isReserve}" :style="{top:top,left:left,height:height}">
    <el-popover ref="popover" placement="right" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    </el-popover>
    <div class="teacher-schedule-course__name" v-popover:popover>
      <span class="teacher-schedule-course__label">数学</span>
    </div>
    <div class="teacher-schedule-course__con" v-if="!isReserve">
      <div class="teacher-schedule-course__lecture">讲义(
        <span class="teacher-schedule-course__bind">{{hasBind?'已绑定':'未绑定'}}</span>)</div>
      <el-dropdown>
        <el-button type="primary" size="mini">
          操作
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" v-if="hasBind">
          <el-dropdown-item>去打印</el-dropdown-item>
          <el-dropdown-item>重新绑定</el-dropdown-item>
          <el-dropdown-item>解除绑定</el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu slot="dropdown" v-else>
          <el-dropdown-item>去绑定</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isReserve: Boolean,
    left: String,
    top: String,
    height: String,
    hasBind: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/styles/variables.less';
.teacher-schedule-course {
  position: absolute;
  min-height: 30px;
  display: flex;
  &__name {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    background: #daebff;
    font-size: 12px;
    width: 30px;
    border-radius: 15px;
    height: 100%;
    &::before {
      content: '正';
      background: #3587ff;
      display: block;
      color: #fff;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
    }
  }
  &__con {
    margin-left: 15px;
    width: 80px;
  }
  &__lecture {
    font-size: 12px;
    line-height: 30px;
  }
  &__bind {
    color: @blue;
  }
  &__label {
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  &.is-reserve &__name {
    background: #ffe7c3;
    &::before {
      content: '预';
      background: #fcb444;
    }
  }
}
</style>
