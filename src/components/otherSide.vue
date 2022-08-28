<template>
  <el-menu default-active="1-4-1"
           class="el-menu-vertical-demo"
           background-color='#545c64'
           text-color='#fff' :active-text-color='color'
           :collapse="isCollapse">
    <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path+''" :key="item.path">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
    <el-submenu v-for="item in haveChildren" :index="item.path+''" :key="item.path">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>

      <el-menu-item-group v-for="(ite,inx) in item.children" :key="ite.path">
        <el-menu-item @click="clickMenu(ite)" :index="inx+''">{{ ite.meta.title }}</el-menu-item>
      </el-menu-item-group>

    </el-submenu>

  </el-menu>

</template>

<script>
export default {
  name: 'otherSide',
  data() {
    return {
      color: '#ffd04b',
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({
        name: item.name
      })
      this.$store.commit('addBreadcrumb', item)
    }
  },
  mounted() {

  },
  computed: {
    getMenu() {
      return this.$store.state.menu
    },
    noChildren() {
      return this.getMenu.filter((item) => {
        return !item.children
      })
    },
    haveChildren() {
      return this.getMenu.filter((item) => {
        return item.children
      })
    },
    isCollapse(){
      return this.$store.state.isCollapse
    }
  }

}
</script>


<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}

.el-menu {
  height: 100%;
  border: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px
  }
}
</style>