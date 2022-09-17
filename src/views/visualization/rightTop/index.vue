<template>
  <dynamic-border class="main" :height="type===1?'25%':'30%'" :width="'23%'">

  </dynamic-border>
</template>

<script>
export default {
  name: "rightTop",
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