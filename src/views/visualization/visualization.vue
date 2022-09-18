<template>
  <div class="visualizationMain">
    <div ref="appRef" class="visualizationMain-content">
      <dv-loading v-if="loading">Loading...</dv-loading>

      <div v-else>
        <div class="visualizationMain-content-titleBtn" @click="handleClick">切换模式</div>
        <left-top :type="type" class="visualizationMain-content-leftTop"></left-top>

        <transition name="el-fade-in-linear">
          <left-center :type="type" v-if="type===1" class="visualizationMain-content-leftCenter"></left-center>
        </transition>

        <left-bottom :type="type" class="visualizationMain-content-leftBottom" ref="leftBottom"></left-bottom>

        <echarts-map :type="type" class="visualizationMain-content-map" ref="echartsMap"></echarts-map>

        <center-bottom :type="type" class="visualizationMain-content-centerBottom"></center-bottom>

        <right-top :type="type" class="visualizationMain-content-rightTop"></right-top>

        <transition name="el-fade-in-linear">
          <rightCenter v-if="type===2" class="visualizationMain-content-rightCenter"></rightCenter>
        </transition>

        <right-bottom :type="type" class="visualizationMain-content-rightBottom"></right-bottom>
      </div>
    </div>
  </div>
</template>

<script>
import echartsMap from './echartsMap/index'
import leftTop from '@/views/visualization/leftTop'
import LeftCenter from "@/views/visualization/leftCenter";
import leftBottom from "@/views/visualization/leftBottom";
import centerBottom from "@/views/visualization/centerBottom";
import rightTop from "@/views/visualization/rightTop";
import rightBottom from "@/views/visualization/rightBottom";
import rightCenter from "@/views/visualization/rightCenter";

export default {
  name: "visualization",
  components: {LeftCenter, echartsMap, leftTop, leftBottom, centerBottom, rightBottom,rightCenter, rightTop},
  data() {
    return {
      timer: null,
      loading: true,
      type: 1
    }
  },
  watch:{
    type:{
      handler(newVal){
        if (newVal===1){
          this.$nextTick(()=>{
            this.handleOrdinary()

          })
        }else{
          this.$nextTick(()=>{
            this.handleSpecial()
          })
        }
      }
    }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    getScale() {
      let ww = window.innerWidth / 1920;
      let wh = window.innerHeight / 1080;
      return ww < wh ? ww : wh;
    },
    resize() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$refs.appRef.style.transform = `scale(${this.getScale()}) translate(-50%, -50%)`;
      }, 200)
    },
    handleClick() {
      switch (this.type) {
        case 1:
          this.type = 2
          break
        case 2:
          this.type = 1
          break
      }
    },
    handleOrdinary(){ //普通状态
      // this.$refs.leftBottom.drawEcharts()//左下
    },
    handleSpecial(){//特殊状态
      // this.$refs.leftBottom.drawEchartsV2()//左下
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
}
</script>

<style scoped lang="scss">
.visualizationMain {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: black;

  &-content {
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 0.5s;
    transform: scale(1) translate(-50%, -50%);
    transform-origin: left top;
    background: url("~@/assets/visualization/background.webp") no-repeat;
    background-size: 100% 100%;

    &-titleBtn {
      position: absolute;
      top: 3.5%;
      left: 25%;
      cursor: pointer;
      color: #fff
    }

    &-titleBtn:hover {
      font-weight: 700;
      color: #5ae3fb;
    }

    &-map {
      position: absolute;
      top: 13%;
      left: 26%;
    }

    &-centerBottom {
      position: absolute;
      bottom:3%;
      left: 26%;
    }

    &-leftTop {
      position: absolute;
      top: 10%;
      left: 2%;
    }

    &-leftCenter {
      position: absolute;
      top: 35%;
      left: 2%;
    }

    &-leftBottom {
      position: absolute;
      bottom: 3%;
      left: 2%;
    }

    &-rightTop {
      position: absolute;
      top: 10%;
      right: 2%;
    }

    &-rightCenter{
      position: absolute;
      top: 42%;
      right: 2%;
    }

    &-rightBottom {
      position: absolute;
      bottom: 3%;
      right: 2%;
    }
  }

}
</style>