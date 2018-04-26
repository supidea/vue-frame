<template>
  <article class="tb-list">
    <router-link tag="section" :to="{name: 'Textbook_Detail', params: {id: item.id}}" class="tb-list__item" v-for="item in data" :key="item.id">
      <div class="tb-list__hd">
        <span class="tb-list__icon"><i class="iconfont icon-jiaocaiitem"></i></span>
        <span class="tb-list__tit">{{item.name}}</span>
      </div>
      <div class="tb-list__bd">
        <span class="tb-list__tags">
          <em v-if="item.grade">{{item.grade}}</em>
          <em v-if="item.season">{{item.season}}</em>
          <em v-if="item.type">{{item.type}}</em>
        </span>
        <span class="tb-list__region">{{item.region}}</span>
      </div>
      <div class="tb-list__ft">
        <span class="tb-list__count">共<em>{{item.courseCount}}</em>次课</span>
        <span class="tb-list__year">{{item.year}}</span>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less">
.tb-list{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  @media only screen and (min-width: 1360px){
    & {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media only screen and (min-width: 1600px){
      & {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      }
    }
  @media only screen and (min-width: 1820px){
    & {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }
  }
  &__item{
    border: var(--blue);
    background-color: #fff;
    padding: 10px;
    cursor: pointer;
    border-radius: var(--border-radius-small);
  }
  &__hd{
    border-bottom: var(--blue);
    padding-bottom: 10px;
    margin-bottom: 10px;
    display: flex;
  }
  &__icon{
    height: 40px;
    width: 40px;
    text-align: center;
    & > i {
      font-size: 34px;
      line-height: 40px;
      color: var(--blue);
    }
  }
  &__tit{
    flex: 1;
    margin-left: 10px;
    height: 40px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 12px;
  }
  &__bd, &__ft{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--gray);
  }
  &__ft {
    margin-top: 5px;
  }
  &__tags, &__count{
    & > em {
      font-style: normal;
    }
  }
  &__tags > em + em{
    margin-left: 8px;
  }
  &__count > em {
    padding: 0 3px;
    color: var(--blue);
  }
}
</style>
