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
  mounted() {
  }
  // components:{echartsMap}
}
</script>

<style scoped lang="scss">
.visualizationMain{
  width: 100%;
  height: 100%;
  background-color: black;

  .visualizationMain-content{
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: white;
    transition: all 0.5s;
    transform-origin: left top;
  }

}
</style>