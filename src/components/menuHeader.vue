<template>
<header>
    <div class="l-content">
        <el-button @click="changeIsCollapse" plain icon = 'el-icon-menu' size="mini"></el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for='item in tags' :key='item.name' :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown trigger="click" szie="mini">
            <el-dropdown-menu slot="dropdown">
               <el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
             </el-dropdown-menu>
        </el-dropdown>
    </div>
</header>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'menuHeader',
    methods: {
      changeIsCollapse(){
        this.$store.commit('changeIsCollapse')
        },
        logout(){
          localStorage.removeItem('token')
          this.$store.menu = []
          this.$router.push({ name:'login' })
        }
    },
    computed:{
        ...mapState({
            tags:state=>state.breadcrumbList
        })
    },

}
</script>

<style lang='less' scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
}
.r-content{
  cursor: pointer;
    .user{
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: skyblue;
    }
}
</style>