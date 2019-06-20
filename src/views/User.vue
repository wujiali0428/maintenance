<template>
  <div class="user">
    <div class="banner">
        <img src="../assets/user_title.png">
        <div class='title'>{{tel}}，车主用户您好</div>
    </div>
    <div class="content">
        <div class="icon" @click="gotoOrder">
          <div>
            <img src="../assets/user_icon1.png">
            <p>我的账单</p>
          </div>
        </div>
        <div class="icon" @click="gotoReport">
          <div>
            <img src="../assets/user_icon2.png">
            <p>维保报告</p>
          </div>
        </div>
    </div>
    <Tabbar />
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Tabbar from '@/components/Tabbar.vue'
export default {
  name: 'user',
   data() {
    return {
      tel: ''
    };
  },
  methods: {
    gotoOrder(){
      this.$router.push('/order');
    },
    gotoReport() {
      this.$router.push('/Report');
    }
  },
  components: {
    Tabbar
  },
  created() {
    if(window.localStorage.getItem('user')){
      let user = JSON.parse(window.localStorage.getItem('user'));
      this.tel=user.Tel.replace(/(\d{3})\d{6}(\d{2})/, '$1******$2')
    }
  },

}
</script>
<style scoped>
.banner {
  background: url(../assets/user_banner.png) no-repeat center center;
  width: 100%;
  height: 1.50rem;
  background-size:cover;
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
    font-size: 0.14rem;
    color: #fff;
    margin-top: 0.15rem;
}
.content {
  width: 3.55rem;
  background: #fff;
  color: #000;
  margin: 0 auto;
  position: relative;
  top: -0.2rem;
  box-shadow: 0.01rem 0.01rem 0.05rem #888888;
}
.icon {
  display: flex;
}
.icon>div {
  margin: 0.227rem 0.15rem 0 0.15rem;
  flex: 1;
  display: flex;
  height: 100%;
  padding-bottom: 0.18rem;
  border-bottom: 0.01rem solid #f8f8f8;
  background: url(../assets/user_icon3.png) no-repeat top right;
  background-size:0.07rem 0.12rem;
}
.icon img {
  width: 0.17rem;
  height: 0.2rem;
  display: block;
}
.icon p {
  font-size: 14px;
  color: #5B5E6A;
  margin-left: 0.23rem;
}
</style> 