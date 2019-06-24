<template>
  <div class="search">
    <div class="search_title">
      <p>为确保查询结果，请您仔细核对VIN码的正确</p>
    </div>
    <div class="search_info">
      <div>
        <label>手机号码</label><input placeholder="请输入手机号" type="tel" v-model="userTel">
      </div>
      <div>
        <label>验证号码</label><input placeholder="请输入验证码" type="number" v-model="code">
        <button type="button" class="login-code-btn" :disabled="canGetCode" @click="sendCode" :style="{opacity:opacity}">{{btnText}}</button>
      </div>
      
      <div class="vin">
          <img src="../assets/where.png" class="vin_image" v-if="where">
          <div><label>车辆VIN码<span class="help-icon" @click="handleFocus">?</span></label></div>
          <input placeholder="输入17位车辆VIN码" type="text" v-model="vin" maxlength="17">
          <input ref="file" type="file" accept="image/*" multiple="multiple" style="display: none;" @change="fileChanged">
          <canvas id="canvas" style="display: none;"></canvas>
          <div class="photo" style="display:flex;margin-left: 0.02rem;">
            <img src="../assets/search_photo.png">
            <p @click="uploadImage">拍照识别</p>
          </div>
      </div>
      <div>
        <label>查询价格</label>
        <div class="price">¥ {{ total}}</div>
      </div>
      <div>
        <label>优惠</label>
        <div class="price" style="color: red">- ¥ {{discount}} </div>
      </div>
      <div style="border-bottom: none">
        <label>合计</label>
        <div class="price">¥ <span style="font-weight:bold;font-size:0.18rem">{{realPay}}</span> </div>
      </div>
    </div>
    <div class="login-btn" @click="handlePay">确认支付</div>
     <div class="hint">
        <p>
        温馨提示：保养记录报告来源于第三方，报告会以短信告知，预计30分钟内收到报告。（非工作时段报告预计次日生成）
        </p>
    </div>
    <!-- 选择支付方式 start-->
    <div v-if='aplay' class="mask">
      <div class="method">
          <div class="method-title"><p style="flex:1;padding-left:0.3rem;">请选择支付方式</p><div @click="choosePay"><img src="./../assets/cancel.png" alt=""></div></div>
          <div class="alipay" @click="onlinePay('ali')"><div style="width:0.5rem;"><img src="./../assets/alipay.png" alt=""></div><div><p>支付宝</p><p>数亿用户都在用，安全可托付</p></div></div>
          <!-- <div class="wxpay"  @click="onlinePay('wechat')"><div style="width:0.5rem;"><img src="./../assets/wxpay.png" alt=""></div><div><p>微信支付</p></div></div> -->
      </div>
    </div>
    <!-- 选择支付方式 end--> 
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import axios from 'axios';
export default {
  data() {
    return {
      // redirect: "",
      userTel: "",  //手机号
      code: "",   //验证码
      btnText: "获取验证码",   //获取验证码按钮
      canGetCode: true,      //获取验证码按钮的状态
      leftTime: 60,       //获取验证码的时间
      timer: null,        // 执行获取验证码函数的计时时间
      canLoginbtn: true,    //确认支付按钮的状态
      vin: '' , //车辆vin码
      total:'', //查询价格
      discount:'',//优惠价格
      realPay:'',  //合计
      where: false,   //显示隐藏vin码在哪里的图片
      token: window.localStorage.getItem('token'),   //用户token信息
      opacity:0.6,   //验证码按钮的颜色
      aplay: false    //选择支付模块显示隐藏
    };
  },
  mounted() {
    this.getPrice();
    document.getElementById('title').innerHTML = this.$route.name

  },
  methods: {
    //获取价格
    getPrice(){
      axios.post('v5/car/get/order_price',{access_token:this.token}).then(res=>{
        console.log(res)
        if(res.data.code ===0 ){
            this.realPay= (res.data.data.real_pay/100).toFixed(2) || 29.00
            this.total= (res.data.data.total_price/100).toFixed(2) || 39.00
            this.discount= (res.data.data.discount/100).toFixed(2) || 10.00
         }
    })
  },
    //点击？显示隐藏图片
    handleFocus: function() {
      if(this.where==false){
         this.where = true;
      }else{
          this.where = false;
      } 
    },
    //点击拍照识别
    uploadImage() {
      this.$refs.file.click();
    },
    fileChanged() {
      const self = this;
      const list = this.$refs.file.files;
      console.log('file',list)
      if (list.length !== 1) {
        Toast({
              message:'最多只能选择1张驾驶证。',
              position: "middle",
              duration: 3000
            });
      }
      const item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0],
      };
      self.html5Reader(list[0], item);
    },
    html5Reader(file, item) {
      const that = this;
      const imgSrc = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        imgSrc.src = e.srcElement.result;
        that.$set(item, 'src', e.srcElement.result);
        imgSrc.onload = function () {//eslint-disable-line
          // 图片原始尺寸
          const originWidth = this.width;
          const originHeight = this.height;
          // 最大尺寸限制
          const maxWidth = 600;
          const maxHeight = 600;
          // 目标尺寸
          let targetWidth = originWidth;
          let targetHeight = originHeight;
          // 图片尺寸超过400x400的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
          }
          const canvas = document.getElementById('canvas');
          const context = canvas.getContext('2d');
          // canvas对图片进行缩放
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight);
          // 图片压缩
          context.drawImage(imgSrc, 0, 0, targetWidth, targetHeight);
          // canvas转为blob并上传
          const data = canvas.toDataURL('image/jpeg').split(',')[1];
          // 获取base64图片大小，返回MB数字
          const size = parseInt(data.length - data.length / 8 * 2);//eslint-disable-line
          console.log(size);
          if (size) {
            const isLt2M = size / 1024 / 1024 < 2;
            if (!isLt2M) {
               Toast({
              message:'图片大小需要小于 2MB!',
              position: "middle",
              duration: 3000
            });
              // that.$showToast({ title: '图片大小需要小于 2MB!' });
              return;
            }
             Toast({
              message:'正在上传',
              position: "middle",
              duration: 3000
            });
            // that.$showToast({ title: '正在上传' });
            that.vehiclecardFetch(data,file);
          }
        };
      };
      reader.readAsDataURL(file);
    },
    vehiclecardFetch(data,file) {
      // 识别行驶证
      const self = this;
      console.log('shangchuan',data);
      axios.post('v2/car/recognize_vehiclecard', {   //https://mys4s.cn/v2/car/recognize_vehiclecard?source=alipay
        // imageString: data,
        access_token: this.token,
        fileType: 'image',
        fileName: 'image',
        filePath: file,
      })
        .then((res) => {
          console.log("res",res)
          if (res.code === 0) {
            if (res.data && res.data.img_url) {
              // self.driveUrl = res.data.img_url;
              Toast({ title: '行驶证识别成功，请您核对信息是否准确' });
              this.vehicleInfo(res.data, self.driveUrl);
            } else {
              Toast({ title: '行驶证识别失败，请重新上传识别' });
            }
          } else {
              Toast({ title: res.msg });
          }
        }).catch((err)=>{
          console.log("err",err)
        });
    },
    //验证码
    sendCode: function() {
      this.canGetCode = true;
      this.leftTime = 60;
      this.btnText = this.leftTime + "s 后重发";
      this.timer = setInterval(this.enableResend, 1000);
      let param = {
        tel: this.userTel
      };
      axios({
          url:"v5/user/code",
          method: 'post',
          data: {tel: this.userTel}
          }).then((res) => {
          console.log(res.code);
          if (res.code > 0) {
            Toast({
              message: res.msg,
              position: "middle",
              duration: 3000
            });
          } else {
            Toast({
              message: "发送成功",
              position: "middle",
              duration: 3000
            });
          }
        })
        .catch((res)=> {
          console.log("e", e);
          Toast({
            message: "发送验证码失败，请重试",
            position: "middle",
            duration: 3000
          });
          clearInterval(this.timer);
          this.canGetCode = false;
          this.opacity = 1
          this.canLoginbtn = false;
          this.btnText= "获取验证码"
        });
    },
    enableResend: function() {
      this.btnText = this.leftTime-- + "s 后重发";
      if (this.leftTime === 0) {
        this.canGetCode = false;
        this.opacity = 1
        clearInterval(this.timer);
        this.btnText = "获取验证码";
      }
    },
    //确认支付按钮
    handlePay: function() {
    //   const telReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
    //   var vinReg = /^[0-9a-zA-Z]{17}$/
    //   if(!telReg.test(this.userTel)){
    //     Toast({
    //       message: "请您输入正确的手机号码",
    //       position: "middle",
    //       duration: 3000
    //     })
    //     return
    //   }
    //   if(this.code.length!=4){
    //     Toast({
    //        message: "验证码错误，请核对后重新输入",
    //       position: "middle",
    //       duration: 3000
    //     })
    //   return
    // }
    // if(!vinReg.test(this.vin)){
    //     Toast({
    //      message: "车辆VIN码格式不正确，请确认后再次提交",
    //       position: "middle",
    //       duration: 3000
    //   });
    //   return
    // }
    // console.log(this.token,"token")
      //验证vin码
      // axios.post('/v5/car/check_vin',{
      //   vin:this.vin,
      //   access_token:this.token
      // }).then(res=>{
      // console.log(res)
      //   if(res.code == 0){
      //     // 验证验证码和手机号
      //     let param = {
      //       tel: this.userTel,
      //       code: this.code,
      //       no_token: true
      //     };
      //     axios.post('v5/user/login',param).then(res => {
      //       if (res.code === 0) {
      //         this.canPay()// 验证码通过，拉取支付
      //       } else {
      //         Toast({
      //           message: res.data.msg,
      //           position: "middle",
      //           duration: 3000
      //         })
      //       }
      //     }).catch(e=>{
      //       Toast({
      //           message: '请您先验证手机号码',
      //           position: "middle",
      //           duration: 3000
      //         })
      //     })
      //   }else {
      //       Toast({
      //         message: res.data.msg,
      //         position: "middle",
      //         duration: 3000
      //       })
      //   }

      // }).catch(e=>{
      // console.log('e',e)
      // })
      this.canPay()
    },
    canPay() {
      this.aplay = true;
    },
    //选择支付方式
     choosePay(){
        this.aplay = false;
      },
      onlinePay(type){
        if(type =='ali'){
          console.log('alipay')
          //选择支付方式，这里需要知道后台参数，然后拉起支付，如果支付成功的话判断时间点，早上八点到晚上九点显示支付成功paysuccess页面，如果不是这个时间点就跳转到申请成功success页面
          //如果没有支付就退回，那么直接跳转到allOrder页面
        }else{
          console.log('wechatPay')
        }
      }
  },
  //监听输入的手机号和验证码
  watch: {
    userTel: function(val) {
      //形参val为每次输入的手机号码
      let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      if(val.length>11){
        this.userTel=val.slice(0,11)
      }
      if (reg.test(val)) {
        this.canGetCode = false;
        this.opacity = 1
      } else {
        this.canGetCode = true;
        this.opacity = 0.6
      }
    },
    // code: function(val) {
    //   if(val.length !== 4){
    //      Toast({
    //         message: "验证码为4位数字",
    //         position: "middle",
    //         duration: 3000
    //       });
    //       return
    //   }
      // if (val.length == 4) {
      //   this.canLoginbtn = false;
      // } else {
      //   this.canLoginbtn = true;
      // }
    // },
    vin: function(val) {
      console.log(val.length)
      if(val.length == 17) {
        var vinReg = /^[0-9a-zA-Z]{17}$/
        console.log(vinReg.test(val))
          if(!vinReg.test(val)){
            Toast({
              message:'车辆VIN码格式不正确，请确认后再次提交',
              position: "middle",
              duration: 3000
            });
            return
            }
      }
    }
  }
};
</script>
<style scoped>
/* 头部提示信息 */
.search_title {
  width: 100%;
  height: 0.44rem;
  font-size: 0.14rem;
  text-align: center;
  line-height: 0.44rem;
  color: #FFA71D;
  background: #FFF1DB;
}
/* 表单信息最外层div */
.search_info {
  background: #fff;
  margin-top: 0.1rem;
  width: 3.55rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}

/* 表单中的每一项 */
.search_info>div{
  border-bottom: 0.01rem solid rgb(237, 233, 233,0.6);
  margin: 0 0.16rem;
  height: 0.46rem;
  display: flex;
  align-items: center;
}
.search_info>div input{
  border: none;
  height: 0.46rem;
  background: transparent;
  outline: none;
  flex: 1;
  width: 0;
}
label {
  display: inline-block;
  width: 0.9rem;
  font-size: 0.14rem;
  color: #5B5E6A;
}

/* 请输入vin码 */
.vin {
   font-size: 0.14rem;
   align-items: center;
   position: relative;
}
.help-icon {
  display: inline-block;
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 50%;
  border: 0.01rem solid #CACBD2;
  text-align: center;
  line-height: 0.16rem;
  font-size:0.13rem;
  color: #CACBD2;
  margin-left: 0.03rem
}
.photo img {
  width: 0.2rem;
  height: 0.18rem;
}
.vin p {
  font-size: 0.12rem;
  color: #3A82FF;
  margin-left: 0.03rem;
  margin-right: 0.1rem;
}
.vin_image {
  width:3.55rem;
  position: absolute;
  bottom: 0.23rem;
  vertical-align: top;
  margin-left: -0.2rem;
}

/* 输入验证码的按钮 */
.login-code-btn {
  border: 0.01rem solid #3a82ff;
  border-radius: 0.02rem;
  color: #3a82ff;
  background: #fff;
  font-size: 0.12rem;
  flex-shrink: 1;
  width:1rem;
}
/* 查询价格 */
.price {
  font-size: 0.14rem;
}
.login-btn {
  width: 2.21rem;
  color: #fff;
  font-size: 0.18rem;
  margin-top: 0.8rem;
  height: 0.5rem;
  background-image: linear-gradient(-151deg, #537EFF 0%, #105FF8 100%);
  box-shadow: 0 0.05rem 0.15rem 0 rgba(58,130,255,0.15);
  border-radius: 0.25rem;
  margin: 0 auto;
  text-align: center;
  line-height: 0.5rem;
  margin-top: 0.68rem;
}
/* 下面的温馨提示 */
.hint {
    padding-bottom: 0.9rem;
     margin-top: 0.3rem;
  }
.hint p {
    height: 0.36rem;
    width: 3.25rem;
    margin: 0 auto;
    background: #EFEFEF;
    margin-bottom: 0.5rem;
    font-size: 0.12rem;
    color: #9C9EA8;
    padding: 0.15rem 0.13rem;
    text-align: left;
  }

  /* 选择支付方式 */
  .mask{
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 999;
    background-color: rgba(0,0,0,0.6);
    top: 0;
  }
  .method {
  width: 100%;
  /* height: 3.6rem; */
  font-size: 0.2rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.method>div:first-child {
  font-weight: bold;
}
.method>div {
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  border-bottom: 0.01rem solid #f0f0f0;
}

.method-title{
  display: flex;
  padding: 0 0.1rem;
}
.method-title>div>img{
  width: 0.15rem;
  height: 0.15rem;
}
.alipay{
  display: flex;
  padding: 0.2rem 0.4rem;
}
.alipay>div>img{
  width: 100%;
  /* padding-top: 0.08rem; */
  /* vertical-align: middle; */
}
.alipay>div:last-child{
  padding-top: 0.05rem;
  padding-left: 0.1rem;
  text-align: left;
  line-height: 0.2rem;
}
.alipay>div:last-child>p:last-child{
  font-size: 0.16rem;
  color: #666;
}

.wxpay{
  display: flex;
  padding: 0.2rem 0.4rem;
}
.wxpay>div>img{
  width: 100%;
  /* padding-top: 0.1rem; */
  /* vertical-align: middle; */
}
.wxpay>div:last-child{
  padding-left: 0.1rem;
  text-align: left;
  /* line-height: 0.2rem; */
}
.wxpay>div:last-child>p{
  /* line-height: 0.8rem; */
}
</style>
