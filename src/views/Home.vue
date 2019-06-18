<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="banner">
      <img src="../assets/banner.png" />
    </div>
    <div class="content">
      <img src="https://app.s4s.cn/razio/maintenance_introduce_bg.png" />
    </div>
    <div class="hint">
        <p>
        温馨提示：保养记录报告来源于第三方，报告会以短信告知，预计30分钟内收到报告。（非工作时段报告预计次日生成）
        </p>
    </div>
    <router-link to="/search">
        <div class="search">立即查询</div>
    </router-link>
    <div class="bottom">
      <div class="more">
          <img src="../assets/more.png">
          <div>首页</div>
      </div>
      <router-link to="/user" class="mine" v-if="login">
          <img src="../assets/user.png">
          <div>我的</div>
     </router-link>
     <router-link to="/more" class="mine" v-else>
          <img src="../assets/user.png">
          <div>我的</div>
     </router-link>
    
      <!-- <router-link to="/search" class="search">我的</router-link> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
   data() {
    return {
        login: true
    }
  },
  components: {
    // HelloWorld
  },

}
</script>
<style scoped>
 .home {
   background: #f5f5f5;
 }
  .banner {
      width: 100%;
      /* vertical-align: top; */
  }
  .banner img{
      width: 100%;
      vertical-align: top;
  }
  .content {
      width: 100%;
      /* vertical-align: top; */
  }
  .content img{
      width: 100%;
      vertical-align: top;
  }

  .hint {
   
    border-radius: 4px;
    /* margin: 0 auto; */
    padding-bottom: 0.9rem;
     margin-top: 0.18rem;
    /* font-family: PingFangSC-Regular; */
   
  }
  .hint p {
    height: 0.36rem;
    width: 3.25rem;
    margin: 0 auto;
    background: #EFEFEF;
    margin-bottom: 0.5rem;
    font-size: 0.12rem;
    color: #9C9EA8;
    /* line-height: 20px; */
    padding: 0.15rem 0.13rem;
    text-align: left;
     /* margin-bottom: 0.2rem; */
  }
  .search {
    height: 0.5rem;
    width: 80%; 
    background-image: linear-gradient(-151deg, #537EFF 0%, #105FF8 100%);
    font-size: 0.18rem;
    border-radius: 0.3rem;
    position: fixed;
    z-index: 100;
    bottom: 0.7rem;
    left: 50%;
    transform: translateX(-50%);
    /* margin: 0 auto; */
    text-align: center;
    line-height: 0.5rem;
    color: #fff;

  }
  .bottom {
    width: 100%;
    display: flex;
    display: -webkit-flex; /* Safari */
    justify-content: space-between;
    /* align-items: center; */
    position: fixed;
    z-index: 100;
    bottom: 0;
    font-size: 0.11rem;
    color: #666;
    text-align: center;
    height: 0.49rem;
  }
  .bottom img {
    width: 0.2rem;
    height: 0,2rem
  }
  .more {
    background: #fff;
    width: 50%;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mine {
    background: #fff;
    width: 50%;
    display: -webkit-flex; /* Safari */
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
</style>

