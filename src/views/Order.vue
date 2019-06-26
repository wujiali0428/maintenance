<template>
  <div class="order">
    <div class="heade" @click="select">
      <div id="-1"><span id="-1" :class="{active:selected==-1}">全部</span></div>
      <div id="0"><span id="0" :class="{active:selected==0}">待付款</span></div>
      <div id="1"><span id="1" :class="{active:selected==1}">处理中</span></div>
      <div id="2"><span id="2" :class="{active:selected==2}">已完成</span></div>
      <div id="4"><span id="4" :class="{active:selected==4}">已取消</span></div>
    </div>
    <div>
      <AllOrders :selected="selected"/>
    </div>
  </div>
</template>

<script>
import AllOrders from '@/components/allOrders'
import axios from 'axios'
export default {
  components:{
    AllOrders
  },
  data(){
    return{
      selected:"-1"
    }
  },
  mounted() {
    document.getElementById('title').innerHTML = this.$route.name
  },
  methods:{
    select(e){
      this.selected = e.target.id;
    }
  },
  created(){

    let param = {
      status: this.selected,
      limit: 2000,
      access_token:window.localStorage.getItem('token')
    }
    axios.post('/v5/car_inspect/get_inspect_order_list',param).then((res)=>{
      console.log("dingdan",res)
    }).catch((err)=>{
      console.log('err',err)
    })
  }
}
</script>



<style scoped>
  .heade{
    display: flex;
    height: 0.5rem;
    background-color: #fff;
  }
  .heade > div{
    flex: 1;
    text-align: center;
    font-size: 0.16rem;
    color: #5B5E6A;
    line-height: 0.5rem;
  }
  .heade > div > span {
    display: inline-block;
    height: 0.48rem;
    border-bottom: 0.02rem solid #fff;
  }
  .heade  .active{
    color:#000;
    font-weight: 500;
    border-bottom: 0.02rem solid #3A82FF;
  }
</style>
