<template>
<div>
    <div class="content" v-if="list.length>0">
        <div v-for='value in list' :key='value.Id'>
            <div class="title">
                <span style="float:left">订单号：{{value.OrderNo}}</span>
                <!-- <span style="float:right" class='active'>剩余支付时间14:00</span> -->
                <span v-if="value.Status == 0" class="s4s-cell-status" style="color: #fd2900;border:none;float:right">待支付</span>
                <span v-if="value.Status == 1" class="s4s-cell-status"  style="color: #3A82FF;border-color:#3A82FF;float:right">处理中</span>
                <span v-if="value.Status == 2" class="s4s-cell-status" style="color: #3CB034;border-color:#3CB034;float:right">已完成</span>
                <span v-if="value.Status == 3" class="s4s-cell-status" style="color: #ffaf30;border-color:#ffaf30;float:right">已退款</span>
                <span v-if="value.Status == 4" class="s4s-cell-status" style="color: #AAAAAA;border-color:#AAAAAA;float:right">已取消</span>
                <span v-if="value.Status == 5" class="s4s-cell-status" style="color: #AAAAAA;border-color:#AAAAAA;float:right">退款中</span>
            </div>
            <div class="con">
                <div>下单时间：<span>{{value.CreateTime || '-'}}</span></div>
                <div>联系电话：<span>{{value.Tel || '-'}}</span></div>
                <div>车辆VIN码：<span>{{value.Vin || '-'}}</span></div>
                <div>支付金额：<span>￥{{ ((value.RealPay || 0) / 100).toFixed(2) }}</span></div>
                <div>订单状态：<span>{{value.StatusStr || '-'}}</span></div>
            </div>
            <div class="footer">
                <div v-if="value.Status == 0">
                    <div class="blue" @click="onlinePay(value.Id)">
                        立即支付
                    </div>
                    <div @click="cancelOrder(value.Id)">
                        取消订单
                    </div>
                </div>
                <div class="write blue" v-else-if="value.Status == 7" @click="gotoReport(value.ReportId)">
                    查看报告
                </div>
                <a href="tel:400-000-1199" v-else-if="value.Status == 2"  class="write" style="display:block">申请退款</a>
                <!-- <div v-else-if="item.Status == 2" class="write" @click="makePhoneCall(value.Id)"> -->
                    <!-- 申请退款 -->
                <!-- </div> -->
            </div>
        </div>
    </div>
    <div class="empty" v-else>
        <img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/credit3x.png"/>
        <div>暂无订单</div>
    </div>
</div>
</template>
<script>
import { Toast,Indicator,MessageBox } from 'mint-ui';
import axios from 'axios'

export default {
    props:{
        selected:String,
        
    },
    data(){
        return{
            list:[],
            token: window.localStorage.getItem('token')
        
        }
    },
    mounted(){
        if(window.localStorage.getItem('order')){
            console.log("有缓存")
             Indicator.open("订单状态查询中");
            let numberQuery = 0;
            window.timer = window.setInterval(()=>{
                numberQuery++;
                if(numberQuery>15) {
                    window.clearInterval(window.timer);
                    Indicator.close();
                    Toast({
                        message: '查询失败',
                        duration: 3000
                    })
                }
                let param = {
                    order_id: window.localStorage.getItem('order').toString(),
                    access_token: this.token
                }
                axios.post('grey/v5/car_inspect/get_by_id',param).then(res=>{
                    if(res.data.code == 0) {
                        if(res.data && res.data.data) {
                            window.clearInterval(window.timer);
                            Indicator.close();
                            window.localStorage.removeItem("order");
                            if(res.data.data.Status == 0){
                                Toast({
                                    message: '订单未付款',
                                    duration: 2000
                                })
                            this.$router.push('/order')
                            }else if(res.data.data.Status == 1){
                                 console.log("判断status为1的时候执行")
                                // 如果状态是1说明已经付款，然后判断是不是早上八点到晚上九点之间下的单，如果是跳转到支付成功PaySuccess页面
                                // 不是的话跳转到申请成功Success页面
                                var date = new Date();
                                var year = date.getFullYear();
                                var month = date.getMonth() + 1;
                                var strDate = date.getDate();
                                // console.log(year,month,strDate)
                                var eight = new Date(year+'/'+month+'/'+strDate + ' 8:00').getTime()
                                var night = new Date(year+'/'+month+'/'+strDate + ' 21:00').getTime()
                                var nowTime = new Date().getTime();
                                console.log(eight,night,nowTime)
                                if(nowTime>eight&&nowTime<night){
                                    this.$router.push('/PaySuccess');
                                }else{
                                    this.$router.push('/Success');
                                }
                            }else{
                                this.$router.push('/order');
                            }
                        }
                    }
                })

            })
        }
    },
    methods:{
        //获取订单
        query(){
            console.log('chaxun',this.selected)
            Indicator.open();
            let self = this
            let param = {
                status: this.selected,
                limit: '2000',
                access_token:this.token
            }
            console.log(param,"获取订单向后台发送的param的值")
            
            axios.post('grey/v5/car_inspect/get_inspect_order_list', param).then(res => {
                console.log(res)
                 Indicator.close();
                if (res.data.code == 0 && res.data.data && res.data.data.list) {
                    const lists = res.data.data.list.map(item=>{
                    // console.log(this.getStatusStr(item.Status),item.Status)
                        return {
                            ...item,
                            StatusStr: this.getStatusStr(item.Status)
                        }
                    })
                    this.list = lists
                    // console.log(this.list)
                }
            //    console.log(this.list)
            }).catch(e=>{
                Toast({
                    message: '查询失败',
                    position: "middle",
                    duration: 3000
                })
            })
            Indicator.close();
        },
        //通过后台返回的参数，转化为文字状态，在上面调用此函数，并保存到list数组中
         getStatusStr(state){
            switch(state){
            case 0:
            return '待支付';
            case 1:
            return '已支付，等待报告生成';
            case 2:
            return '已支付，报告已生成';
            case 3:
            return '已退款，报告生成失败';
            case 4:
            return '已取消';
            default: 
            return '无';
            }
        },
        //取消订单
        cancelOrder(id) {
            let self = this
             MessageBox.confirm('您确定要取消订单吗?').then(action=>{
                let param = {
                    order_id: id.toString(),
                    access_token: this.token
                }
            // v3/violation/order/cancel v2/car/cancel_vio_order
                axios.post('grey/v5/car_inspect/cancel_inspect_order', param).then(res => {
                    if (res.data.code == 0) {
                        Toast({
                            icon:'none',
                            message: '取消成功'
                        })
                        self.query()
                    }else {
                        Toast({
                            icon:'none',
                            message: res.data.msg
                        })
                    }
                })
             }).catch((err)=>{
                console.log(err)
             })
        },
        onlinePay(id) {
            let param = {
                order_id: id.toString(),
                access_token: this.token
            }
            axios.post('grey/v5/car_inspect/pay_order',param).then((res)=>{
                console.log(res)
                if(res.data.code > 0) { 
                Toast({
                    message: res.data.msg,
                    position: 'middle',
                    duratioon: 3000
                })
                return
                }
                if (res.data && res.data.data.qr_code) {
                    console.log(id)
                    window.localStorage.setItem('order',id)
                    window.location.href=res.data.data.qr_code
                }
            
            })
        },
        //查看报告
        gotoReport(id) {
            location.href = `https://mys4s.cn/static/wb/index.html#/Report/${id}?token=${this.token}`
        },
       
    },
    created(){
        this.query();
        console.log(window.localStorage.getItem('order'))
    },
    watch:{
        selected(){
            this.query();
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
    .s4s-cell-status {
        font-size:.13rem;
        /* border: .005rem solid; */
        line-height:.28rem;
        padding:.02rem 0;
        border-radius: .04rem;
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