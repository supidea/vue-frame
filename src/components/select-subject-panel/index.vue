<template>
  <div>
    <el-popover ref="popover" placement="bottom" width="240" trigger="click" transition="fade-in-linear" @hide="handleHide">
      <div class="select-subject-panel__title">选择知识体系科目学科</div>
      <el-form label-width="70px" size="mini">
        <v-item :data="child" v-for="child in sgrOptions" v-model="selectResult[child.key]" :key="child.key" />
        <el-form-item style="text-align: center" label-width="0">
          <el-button type="primary" :loading="loading" @click="update">{{loading?'正在提交...':'确定'}}</el-button>
        </el-form-item>
      </el-form>
    </el-popover>
    <div v-popover:popover>
      <el-button size="mini">
        {{selectResultText}}
        <i class="el-icon-arrow-down"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import vItem from './item'
export default {
  components: { vItem },
  data() {
    return {
      loading: false,
      selectResult: {
        periodId: '',
        regionId: '',
        subjectId: ''
      }
    }
  },
  computed: {
    ...mapState({
      sgrOptions: state => state.app.sgrOptions,
      regionId: state => state.user.regionId,
      periodId: state => state.user.periodId,
      subjectId: state => state.user.subjectId
    }),
    selectResultText() {
      let str = ''
      this.sgrOptions.forEach(v => {
        let res = v.list.find(v => v.code === this.selectResult[v.key])
        if (res) str += res.label
      })
      return str
    }
  },
  created() {
    this.selectResult.periodId = this.periodId
    this.selectResult.regionId = this.regionId
    this.selectResult.subjectId = this.subjectId
    console.log(this.selectResult)
    this.getSgrOptions('BASE')
  },
  methods: {
    ...mapActions(['getSgrOptions']),
    update() {
      console.log(this.selectResult)
      // this.loading = true
    },
    handleHide() {
      this.loading = false
    }
  }
}
</script>

<style lang="less">
@import url('../../assets/styles/variables.less');
.select-subject-panel {
  &__title {
    font-size: 12px;
    border-bottom: 1px solid @baseBorderColor;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
}
</style>
