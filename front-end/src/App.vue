<template>
  <div>
    <div id="app">
      <notifications position="bottom right" />
      <nav-bar />
      <side-bar />

      <br>
      <div style="margin-left: 330px;margin-right:10px;">
        <router-view />
      </div>
    </div>  
  </div>
</template>

<script>
import SideBar from "./layout/SideBar";
import NavBar from "./layout/NavBar";

export default {
  components: {
    NavBar,
    SideBar
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
