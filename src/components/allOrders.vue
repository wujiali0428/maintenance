<template>
    <div class="content">
        <div>
            <div class="title">
                <span style="float:left">订单号：2018061221001024121</span>
                <span style="float:right" class="active">剩余支付时间14:00</span>
            </div>
            <div class="con">
                <div>下单时间：<span>{{}}</span></div>
                <div>联系电话：<span>{{}}</span></div>
                <div>车辆VIN码：<span>{{}}</span></div>
                <div>支付金额：<span>{{}}</span></div>
                <div>订单状态：<span>{{}}</span></div>
            </div>
            <div class="footer">
                <div v-if="true">
                    <div class="blue">
                        立即支付
                    </div>
                    <div>
                        取消订单
                    </div>
                </div>
                <div class="write blue" v-else-if="false">
                    查看报告
                </div>
                <div v-else class="write">
                    申请退款
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
    }

}
</script>

<style scope>
    .content{
        padding:0 0.1rem;
        overflow: hidden;
        padding-bottom: 0.3rem
    }
    .content>div{
        margin-top: 0.1rem;
        padding: 0 0.16rem;
        background-color: #fff;
    }
    .title{
        height: 0.39rem;
        overflow: hidden;
        border-bottom: 0.01rem soild #F2F2F2;
    }
    .title>span{
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        color: #9C9EA8;
        line-height: 0.39rem;
    }
    .title .active{
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #FD2900;
    }
    .con{
        padding-bottom: 0.13rem;
        border-bottom: 0.01rem soild #F2F2F2;
    }
    .con>div{
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        color: #24252D;
        height: 0.2rem;
        line-height: 0.2rem;
        margin-top: 0.12rem;
    }
    .con>div>span{
        color:#000;
    }
    .footer{
        padding-top: 0.17rem;
        padding-bottom: 0.14rem;
        overflow: hidden;
    }
    .footer>.write,
    .footer>div>div{
        width: 0.89rem;
        height: 0.28rem;
        border: 0.01rem solid #E1E3E8;
        border-radius: 0.15rem;
        float: right;
        margin-left: 0.1rem;
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        color: #9C9EA8;
        text-align: center;
        line-height: 0.28rem;
    }
    .footer .blue{
        border: 0.01rem solid #537EFF;
        color: #fff;
        background-image: linear-gradient(-151deg, #537EFF 0%, #105FF8 100%);
        box-shadow: 0 5px 15px 0 rgba(58,130,255,0.20);
        border-radius: 15px;
    }
</style>