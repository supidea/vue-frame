<template>
  <span class="schedule-table-course" sign="正">
    <var>数学</var>
  </span>
</template>

<style lang="less">
.schedule-table-course {
  --w: 2em;
  width: var(--w);
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #daebff;
  border-radius: ~'calc(var(--w) / 2)';
  font-size: 12px;
  cursor: pointer;
  &::before {
    width: var(--w);
    height: var(--w);
    line-height: var(--w);
    text-align: center;
    border-radius: 50%;
    content: attr(sign);
    background-color: var(--blue);
    color: #fff;
  }
  & > var {
    flex: 1;
    width: 1em;
    line-height: 1.2;
    display: flex;
    align-items: center;
    font-style: normal;
    padding: 4px 0;
  }
}
</style>
