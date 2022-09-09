<template>
  <div class="visualizationMain">
    <div ref="appRef" class="visualizationMain-content">
      <echartsMap class="visualizationMain-content-map"></echartsMap>
    </div>
  </div>
</template>

<script>
import echartsMap from './echartsMap/index'
export default {
  name: "visualization",
  components:{echartsMap},
  data(){
    return{
      timer:null
    }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods:{
    getScale(){
      let ww = window.innerWidth / 1920;
      let wh = window.innerHeight / 1080;
      return ww < wh ? ww : wh;
    },
    resize(){
      if (this.timer){
        clearTimeout(this.timer)
      }
      setTimeout(()=>{
        this.$refs.appRef.style.transform = `scale(${this.getScale()}) translate(-50%, -50%)`;
      },200)

    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },
}
</script>

<style scoped lang="scss">
.visualizationMain{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: black;

  &-content{
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 0.5s;
    transform-origin: left top;
    background:url("~@/assets/login/loginBg.jpg") no-repeat 100% 100%;

    &-map{
      position: absolute;
      top: 10%;
      left: 24%;
    }
  }

}
</style>