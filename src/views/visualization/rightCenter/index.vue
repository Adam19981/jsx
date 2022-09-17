<template>
  <dynamic-border class="main" :height="'25%'" :width="'23%'">

  </dynamic-border>
</template>

<script>
export default {
  name: "rightCenter",
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
}
</style>