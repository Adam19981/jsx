<template>
  <dynamic-border class="main" :height="type===1?'60%':'28%'" :width="'23%'">

  </dynamic-border>
</template>

<script>
export default {
  name: "leftBottom",
  props:{
    type:{
      type:Number,
      default:1
    }
  }
}
</script>

<style scoped lang="less">
.main{
  transition: 0.5s;
}
</style>