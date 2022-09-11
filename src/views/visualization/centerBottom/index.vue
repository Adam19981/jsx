<template>
  <dynamic-border class="main" :height="type===1?'20%':'28%'" :width="'48%'">
  </dynamic-border>
</template>

<script>
import dynamicBorder from '@/components/border'
export default {
  name: "centerBottom",
  components:{dynamicBorder},
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