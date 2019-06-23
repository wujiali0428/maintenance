<template>
  <div>
    <div class="header">
      为确保查询结果，请您仔细核对VIN码的正确
    </div>
    <div class="content">
      <div class="form">
        <div>
          <div>手机号码<input type="text"></div>
        </div>
        <div>
          <div>验证号码<input type="text"></div>
        </div>
        <div>
          <div>车辆VIN码<input type="text"></div>
        </div>
        <div>
          <div>查询价格<input type="text"></div>
        </div>
        <div>
          <div>优惠<input type="text"></div>
        </div>
        <div>
          <div>合计<input type="text"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    details (){
      console.log("details")
    },
    goIndex(){
      console.log("goIndex")
    }
  }
}
</script>
<style>
  .header{
    height: 0.44rem;
    background: #FFF1DB;
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #FFA71D;
    line-height: 0.44rem;
    padding-left: 0.26rem;
  }
  .content{
    padding: 0.1rem;
  }
  .form>div{
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #5B5E6A;
    padding: 0.16rem 0.12rem;
  }
</style>
