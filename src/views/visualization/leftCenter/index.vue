<template>
  <dynamic-border class="main" :height="type===1?'29%':'29%'" :width="'23%'">

  </dynamic-border>
</template>

<script>
export default {
  name: "leftCenter",
  props:{
    type:{
      type:Number,
      default:1
    }
  }
}
</script>

<style scoped lang="less">

</style>