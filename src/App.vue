<template>
  <div id="app">
    <headertop></headertop>
    <tab></tab>
    <router-view></router-view>

  </div>
</template>

<script>
import Tab from './components/tab/tab'
import Headertop from './components/headertop/headertop'
export default {
  name: 'App',
  components:{
    Tab,
    Headertop,
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  overflow-y: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
