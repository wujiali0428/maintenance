<template>
<div>
    <div class="content" v-if="list.length>0">
        <div v-for='value in list' :key='value.Id' style="padding-bottom: 0.2rem">
            <div class="title">
                <span style="float:left">订单号：{{value.OrderNo || '-'}}</span>
            </div>
            <div class="con">
                <div>下单时间：<span>{{value.CreateTime || '-'}}</span></div>
                <div>联系电话：<span>{{value.Tel || '-'}}</span></div>
                <div>车辆VIN码：<span>{{value.Vin || '-'}}</span></div>
                <div>支付金额：<span>￥{{ ((value.RealPay || 0) / 100).toFixed(2) }}</span></div>
                <div>订单状态：<span>已支付，报告已生成</span></div>
                
            </div>
            <div class="write blue" @click="gotoReport(value.ReportId)">查看报告</div>
        </div>
    </div>
    <div class="empty" v-else>
        <img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/credit3x.png"/>
        <div>暂无订单</div>
    </div>

</div>
</template>
<script>
import { Toast,Indicator } from 'mint-ui';
import axios from 'axios'

export default {
    // props:{
    //     selected:String
    // },
    data(){
        return{
            list:[],
            selected: 2,
            token: window.localStorage.getItem('token')
        }
    },
    mounted() {
      document.getElementById('title').innerHTML = this.$route.name
    },
    methods:{
        //查看报告
        gotoReport(id) {
            location.href = "https://mys4s.cn/static/wb/index.html#/Report/"+id+"?token="+this.token
        },
        query(){
            Indicator.open("正在查询...");
            console.log('chaxun',this.selected)
            let self = this
            let param = {
                status: "2",
                limit: '2000',
                access_token: this.token
            }
            
            axios.post('/v5/car_inspect/get_inspect_order_list', param).then(res => {
                 Indicator.close();
                if (res.data.code == 0 && res.data.data && res.data.data.list) {
                        this.list = res.data.data.list
                }
            }).catch(e=>{
                Indicator.close();
                Toast({
                    message: '查询失败',
                    position: "middle",
                    duration: 3000
                })
            })
        },
    },
    created(){
        this.query();
        
    },
    watch:{
        selected(){
            this.query();
            console.log(this.selected);
        }
    },
   

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
        overflow: hidden;
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
    .title .processing{
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #3A82FF;
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
    .write{
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
    .blue{
        border: 0.01rem solid #537EFF;
        color: #fff;
        background-image: linear-gradient(-151deg, #537EFF 0%, #105FF8 100%);
        box-shadow: 0 5px 15px 0 rgba(58,130,255,0.20);
        border-radius: 15px;
    }
    .empty{
        width: 100%;
        text-align: center;
    }
    .empty img{
        width: 1rem;
        margin-top: 50%;
        vertical-align: middle;
    }
    .empty div{
        font-size: 0.16rem;
        text-align: center;
        margin-top: 0.1rem;
    }
</style>