<template>
  <div class="order">
    <div class="header" @click="select">
      <div id="1"><span id="1" :class="{active:selected==1}">全部</span></div>
      <div id="2"><span id="2" :class="{active:selected==2}">待付款</span></div>
      <div id="3"><span id="3" :class="{active:selected==3}">处理中</span></div>
      <div id="4"><span id="4" :class="{active:selected==4}">已完成</span></div>
      <div id="5"><span id="5" :class="{active:selected==5}">已取消</span></div>
    </div>
    <div>
      <AllOrders/>
    </div>
  </div>
</template>

<script>
import AllOrders from '@/components/allOrders'

export default {
  components:{
    AllOrders
  },
  data(){
    return{
      selected:1
    }
  },
  methods:{
    select(e){
      this.selected = e.target.id;
    }
  }
}
</script>



<style scoped>
  .header{
    display: flex;
    height: 0.5rem;
    background-color: #fff;
  }
  .header > div{
    flex: 1;
    text-align: center;
    font-size: 0.16rem;
    color: #5B5E6A;
    line-height: 0.5rem;
  }
  .header > div > span {
    display: inline-block;
    height: 0.48rem;
    border-bottom: 0.02rem solid #F2F2F2;
  }
  .header  .active{
    color:#000;
    font-weight: 500;
    border-bottom: 0.02rem solid #3A82FF;
  }
</style>
