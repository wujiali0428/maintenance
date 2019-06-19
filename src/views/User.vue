<template>
  <div class="user">
    <div class="banner">
        <img src="../assets/user_title.png">
        <div class='title'>{{tel}}，车主用户您好</div>
    </div>
    <div class="content">
        <div class="icon">
          <div >
            <img src="../assets/user_icon1.png">
            <p>我的账单</p>
          </div>
        </div>
        <div class="icon">
          <div>
            <img src="../assets/user_icon2.png">
            <p>维保报告</p>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'user',
   data() {
    return {
      tel: ''
    };
  },
  created() {
    if(window.localStorage.getItem('user')){
      let user = JSON.parse(window.localStorage.getItem('user'));
      this.tel=user.Tel.replace(/(\d{3})\d{6}(\d{2})/, '$1******$2')
    }
  }
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
  margin: 0 auto;
  position: relative;
  top: -0.2rem;
}
.icon {
  display: flex;
  /* border-bottom: 0.01rem solid #f8f8f8;   */
}
.icon>div {
  margin: 0.227rem 0.15rem 0 0.15rem;
  flex: 1;
  display: flex;
  height: 100%;
  padding-bottom: 0.18rem;
  border-bottom: 0.01rem solid #f8f8f8;
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