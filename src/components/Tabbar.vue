<template>
  <div class="home">
    <div class="bottom">
      <router-link to="/" class="more">
          <img src="../assets/more.png">
          <div>首页</div>
      </router-link>
      <router-link to="/user" class="mine">
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
  name: 'Tabbar',
   data() {
    return {
        // login: true
    }
  },
  components: {
    // HelloWorld
  },
  props: {
    msg: String
  }

}
</script>
<style scoped>
 .home {
   background: #f5f5f5;
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
    text-align: center;
    line-height: 0.5rem;
    color: #fff;

  }
  .bottom {
    width: 100%;
    display: flex;
    display: -webkit-flex; /* Safari */
    justify-content: space-between;
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
    border-top: 0.01rem solid #f3f3f3;
    /* box-shadow: 0.01rem 0.01rem 0.05rem #fefefe; */
  }
  .mine {
    background: #fff;
    width: 50%;
    display: -webkit-flex; /* Safari */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top: 0.01rem solid #f3f3f3;
  }
  
</style>

