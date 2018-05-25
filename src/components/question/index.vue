<template>
  <div class="m-qu">
    <div class="m-qu-btns">
      <slot name="btns" :item="$attrs.data"></slot>
    </div>
    <v-item v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import vTag from './tag'
import vItem from './item'
export default {
  components: {
    vTag,
    vItem
  },
  inheritAttrs: false
}
</script>

<style lang="less">
.m-qu {
  --bg-color: rgb(248,248,248);
  --text-color-hover: #fff;
  --border-color: var(--text-color-hover);
  --border: 1px solid var(--border-color);
  padding: 20px;
  position: relative;
  border: var(--border);
  font-size: 12px;
  border-radius: 5px;
  &.is-hover:hover{
    --text-color-hover: #20a0ff;
  }
  &.is-hover:hover &-btns{
    display: inline-flex;
  }
  &-btns{
    position: absolute;
    border-bottom: 0 none;
    top: -26px;
    right: 20px;
    border-radius: 5px 5px 0 0;
    display: none;
    -webkit-user-select: none;
    border: var(--border);
    &__itm{
      font-size: 12px;
      line-height: 24px;
      height: 24px;
      white-space: nowrap;
      color: var(--text-color-hover);
      padding: 0 20px;
      cursor: pointer;
      &:hover{
        background: var(--text-color-hover);
        color: #fff;
      }
    }
    &__itm + &__itm{
      border-left: var(--border);
    }
  }
}
</style>
