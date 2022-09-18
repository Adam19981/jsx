<template>

  <dynamic-border class="main" :height="type===1?'20%':'28%'" :width="'48%'">
    <dv-scroll-board class="main-list" :config="config"/>
  </dynamic-border>
</template>

<script>

export default {
  name: "centerBottom",
  props:{
    type:{
      type:Number,
      default:1
    }
  },
  data(){
    return{
      config:{}
    }
  },
  mounted() {
    this.drawList()
  },
  methods:{
    drawList(){
      this.config = {
        headerBGC:'rgba(0,146,246,0.4)',
        oddRowBGC:'rgba(0,0,0,0)',
        evenRowBGC:'rgba(0,212,199,0.1)',
        header: ['列1', '列2', '列3'],
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ]
      }
    }
  }
}
</script>

<style scoped lang="less">
.main{
  transition: 0.5s;

  &-list{
    position: absolute;
    top: 2.5%;
    left: 1%;
    width: 98%;
    height: 95%;
    z-index: 10;
  }
}
</style>