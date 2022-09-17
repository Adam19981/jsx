<template>
  <dynamic-border class="main" :height="type===1?'31%':'60%'" :width="'23%'">

  </dynamic-border>
</template>

<script>
export default {
  name: "rightBottom",
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