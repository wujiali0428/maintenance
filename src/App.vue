<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted(){
    window._hmt.push(['_trackPageview', window.location.href.substring(window.location.href.indexOf(window.location.pathname))]);
    console.log(window.location.pathname)
    console.log(window.location.href.substring(window.location.href.indexOf(window.location.pathname)))
  }
}
</script>

<style>
body {
  background: #f8f8f8 !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* .Indicator {
  width: 0.2rem
} */
.mint-indicator-spin{
display: block !important;
}
.mint-indicator-spin>div{
margin: 0 auto !important;
}
</style>
