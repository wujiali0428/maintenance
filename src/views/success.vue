<template>
    <div class="successful">
        <div class="top">
            <div>
                <img src="" alt="">
            </div>
            <h1>申请成功</h1>
            <p>由于现在不在服务时间，报告将会在下个工作日第一时间为您生成，请您耐心等待〜</p>
        </div>
        <div class="prompt">
            <p>温馨提示：保养记录报告生成后会以短信告知服务时间：</p>
            <p>工作日8:00〜21:00 (周末除外)。</p>
        </div>
        <div class="button">
            <div @click="details">订单详情</div>
            <div @click="goIndex">返回首页</div>
        </div>
        <div>
            广告位
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted() {
        document.getElementById('title').innerHTML = this.$route.name
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
    .successful{
        padding: 0.1rem;
    }
    .successful>.top{
        background: #fff;
    }
    .successful>.top>h1{
        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        color: #000000;
        text-align: center;
    }
    .successful>.top>p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #5B5E6A;
        text-align: center;
        padding: 0.06rem 0.23rem 0.27rem;
    }
    .prompt{
        margin-top: 10px;
        padding: 0.13rem 0.16rem;
        background-color: #EFEFEF;
    }
    .prompt>p{
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        color: #9C9EA8;
        line-height: 0.2rem;
    }
    .button{
        margin-top: 0.3rem;
        display: flex;
        height: 0.5rem;
    }
    .button>div{
        flex: 1;
        margin: 0 0.1rem;
        width: 1.6rem;
        height: 0.5rem;
        border: 0.01rem solid #3F75FD;
        box-shadow: 0 0.05rem 0.15rem 0 rgba(58,130,255,0.15);
        border-radius: 0.25rem;
        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        color: #3F75FD;
        text-align: center;
        line-height: 0.5rem;
        background-color: #fff;
    }
</style>
