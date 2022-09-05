<template>
  <div class="visualizationMain">
    <echartsMap></echartsMap>
  </div>
</template>

<script>
import echartsMap from './echartsMap/index'
export default {
  name: "visualization",
  components:{echartsMap}
}
</script>

<style scoped lang="less">
.visualizationMain{
  width: 100%;
  height: 100%;
}
</style>