<template>
  <div class="visualizationMain">
    <div ref="appRef" class="visualizationMain-content">
<!--      <echartsMap></echartsMap>-->
    </div>
  </div>
</template>

<script>
// import echartsMap from './echartsMap/index'
import Mixin from '@/publicMethod/drawMixin'
export default {
  name: "visualization",
  mixins:[Mixin],
  // components:{echartsMap}
}
</script>

<style scoped lang="less">
.visualizationMain{
  width: 100%;
  height: 100%;
  background-color: black;

  .visualizationMain-content{
    width: 100%;
    height: 100%;
    background-color: white;
  }

}
</style>