<template>
  <div>
    <el-popover ref="popover" placement="bottom" width="240" trigger="click" transition="fade-in-linear" @hide="handleHide" v-model="visible">
      <div class="select-subject-panel__title">选择{{helpTipText}}</div>
      <el-form label-width="70px" size="mini">
        <v-item v-model="selectResult.regionId" v-if="regionOptions.list" :label="regionOptions.label" :options="regionOptions.list" type="select" />
        <v-item v-model="selectResult.subjectId" v-if="subjectOptions.list" :label="subjectOptions.label" :options="subjectOptions.list" type="select" />
        <v-item v-model="selectResult.periodId" v-if="periodOptions.list" :label="periodOptions.label" :options="periodOptions.list" type="select" />
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
import { user } from '../../api'
import vItem from './item'
export default {
  components: { vItem },
  data() {
    return {
      loading: false,
      visible: false,
      selectResult: {
        regionId: '',
        periodId: '',
        subjectId: ''
      }
    }
  },
  computed: {
    ...mapState({
      sgrOptions: state => state.app.sgrOptions,
      regionOptions: state => state.app.regionOptions,
      periodOptions: state => state.app.periodOptions,
      subjectOptions: state => state.app.subjectOptions,
      regionId: state => state.user.regionId,
      periodId: state => state.user.periodId,
      subjectId: state => state.user.subjectId
    }),
    selectResultText() {
      let region = this.regionOptions.list.find(v => v.code === this.regionId)
      let period = this.periodOptions.list.find(v => v.code === this.periodId)
      let subject = this.subjectOptions.list.find(
        v => v.code === this.subjectId
      )
      let str = ''
      if (region) str += region.label
      if (period) str += period.label
      if (subject) str += subject.label
      return str
    },
    helpTipText() {
      return this.regionOptions.label + this.subjectOptions.label + this.periodOptions.label
    }
  },
  created() {
    this.getBaseOptions()
    this.selectResult.regionId = this.regionId
    this.selectResult.periodId = this.periodId
    this.selectResult.subjectId = this.subjectId
  },
  methods: {
    ...mapActions(['getBaseOptions', 'updateUserSgr']),
    async update() {
      this.loading = true
      try {
        await user.updateUserSgr(this.selectResult)
        this.updateUserSgr(this.selectResult)
        this.visible = false
      } catch (err) {
        this.$message.error(err)
      }
      this.loading = false
    },
    handleHide() {
      this.loading = false
    },
    change(val) {
      this.selectResult = { ...this.selectResult, ...val }
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
