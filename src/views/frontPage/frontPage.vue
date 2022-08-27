<template>
    <el-container>
      <el-aside width='auto'>
         <otherSide/>
      </el-aside>
      <el-container>
        <el-header>
          <menu-header/>
        </el-header>
        <tagger/>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
import otherSide from '@/components/otherSide.vue'
import menuHeader from '@/components/menuHeader.vue'
import tagger from '@/components/tagger.vue'


export default {
  name: 'frontPage',
  components:{
    otherSide,
    menuHeader,
      tagger
  },

   
  
}
</script>


<style lang='less' scoped>
.el-header{
  background-color: #333;
}
.el-main{
  padding-top: 0;
}
</style>
