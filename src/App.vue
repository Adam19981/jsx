<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
*{
  box-sizing: border-box;
}
#app{
  width: 100%;
  height: 100vh;
}
html,body{
  margin: 0;
  padding: 0;
}

</style>
