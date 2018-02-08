<template>
  <section class="topic-selector-panel">
    <v-item labelWidth="50px" label="年份" :options="options" :value="selectResult" :handle-select="handleSelect"/>
  </section>
</template>

<script>
import vItem from './item'
export default {
  components: { vItem },
  props: {
    labelWidth: [String]
  },
  data() {
    return {
      isExpand: false,
      selectResult: '',
      options: [
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        },
        {
          code: '111',
          label: '山东'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="less">
@import url('../../assets/styles/variables.less');
.topic-selector-panel {
  background-color: #fff;
  padding: 15px 20px;
  font-size: 12px;
  &__item {
    display: flex;
    align-items: baseline;
    margin: 0 0 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__tags {
    flex: 1;
    margin: 0;
    overflow: hidden;
    & > span {
      cursor: pointer;
      display: inline-flex;
      padding: 3px 8px;
      border-radius: @baseBorderRadius;
      margin-right: 10px;
      &.is-active {
        background-color: @blue;
        color: #fff;
      }
    }
  }
  &__more {
    width: 60px;
    text-align: right;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
