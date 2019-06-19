<template>
  <div class="user">
    <div class="banner">
        <img src="../assets/user_title.png">
        <div class='title'>{{tel}}，车主用户您好</div>
    </div>
    <div class="content">
        <div>
          <img src="../assets/user_icon1.png">
          <text>我的账单</text>
        </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'user',
  components: {
    
  },
   data() {
    return {
      tel: '11111'
    };
  },
}
</script>
<style scoped>
.banner {
  background: url(../assets/user_banner.png) no-repeat center center;
  width: 100%;
  height: 1.50rem;
  background-size:cover;
  /* margin: 0 auto; */
  text-align: center;
  overflow: hidden;
}
.banner img{
  margin: 0 auto;
  height: 0.42rem;
  width: 0.42rem;
  display: block;
  margin-top: 0.24rem;
}
.title {
    /* vertical-align: top; */
    font-size: 0.14rem;
    color: #fff;
    margin-top: 0.15rem;
    /* margin-top: 0.24rem; */
}
.content {
  width: 3.55rem;
  background: #fff;
  color: #000;
}
</style> 