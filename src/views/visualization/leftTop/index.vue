<template>
  <div class="main" :style="{height: type===1?'25%':'20%'}"></div>
</template>

<script>
export default {
  name: "leftTop",
  props:{
    type:{
      type:Number,
      default:1
    }
  }
}
</script>

<style scoped lang="less">2
.main{
  width: 23%;
  height: 25%;
  background-color: rgba(0,0,0,0.5);
  transition: 0.5s;
}
</style>