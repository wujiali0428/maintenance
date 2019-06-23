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
        <button type="button" class="login-code-btn" :disabled="canGetCode" @click="sendCode">{{btnText}}</button>
      </div>
      
      <div class="vin">
          <img src="../assets/where.png" class="vin_image" v-if="where">
          <div><label>车辆VIN码<span class="help-icon" @click="handleFocus">?</span></label></div>
          <input placeholder="输入17位车辆VIN码" ref="file" type="file" accept="image/*" multiple="multiple" style="display: none;" @change="fileChanged">
          <div class="photo" style="display:flex;margin-left: 0.02rem;">
             <canvas id="canvas" style="display: none;"></canvas>
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
      <div>
        <label>合计</label>
        <div class="price">¥ <span style="font-weight:bold;font-size:0.18rem">{{realPay}}</span> </div>
      </div>
    </div>
    <div class="login-btn" @click="goLogin">确认支付</div>
     <div class="hint">
        <p>
        温馨提示：保养记录报告来源于第三方，报告会以短信告知，预计30分钟内收到报告。（非工作时段报告预计次日生成）
        </p>
    </div>
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
      // fileChanged: '',  //识别vin码的input绑定
    };
  },
  mounted() {
    this.getPrice();
  },
  methods: {
    //获取价格
    getPrice(){
      let token =  window.localStorage.getItem("token");
      axios.post('v5/car/get/order_price',{access_token:token}).then(res=>{
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
            that.vehiclecardFetch(data);
          }
        };
      };
      reader.readAsDataURL(file);
    },
    vehiclecardFetch(data) {
      // 识别行驶证
      const self = this;
      axios.post('v2/car/b64/recognize_vehiclecard', {
        imageString: data,
      })
        .then((xhr, res) => {
          if (res.code === 0) {
            if (res.data && res.data.img_url) {
              // self.driveUrl = res.data.img_url;
              this.$showToast({ title: '行驶证识别成功，请您核对信息是否准确' });
              this.vehicleInfo(res.data, self.driveUrl);
            } else {
              this.$showToast({ title: '行驶证图片识别失败，请再次拍照识别或手动输入' });
            }
          } else {
            this.$showToast({ title: res.msg });
          }
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
          this.canLoginbtn = false;
          this.btnText= "获取验证码"
        });
    },
    enableResend: function() {
      this.btnText = this.leftTime-- + "s 后重发";
      if (this.leftTime === 0) {
        this.canGetCode = false;
        clearInterval(this.timer);
        this.btnText = "获取验证码";
      }
    },
    goLogin: function() {
      let self = this;
      let param = {
        tel: this.userTel,
        code: this.code
      };
      axios.post("v5/user/login", param).then((res) => {
         console.log(res,"ssssss")
        if (res.code > 0) {
          Toast({
            message: res.msg,
            position: "middle",
            duration: 3000
          });
        } else {
          // console.log(res,"!!!!")
          let userInfo = res.data.data.User;
          let token = res.data.data.Token;
        //存本地的时候要转成json字符串，否则会强制转换成字符串，打印出来的是object
          window.localStorage.setItem("user", JSON.stringify(userInfo));
          window.localStorage.setItem("token", token);
          Toast({
            message: "登陆成功",
            position: "middle",
            duration: 3000
          });

          this.$router.push('/user');
        }
      });
    },
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
      } else {
        this.canGetCode = true;
      }
    },
    code: function(val) {
      if(val.length>4){
         Toast({
            message: "验证码为4位数字",
            position: "middle",
            duration: 3000
          });
          return
      }
      if (val.length == 4) {
        this.canLoginbtn = false;
      } else {
        this.canLoginbtn = true;
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
  margin-top: 0.1rem;
  width: 3.55rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}

/* 表单中的每一项 */
.search_info>div{
  border-bottom: 0.01rem solid #D8D8D8;
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
  border: 1px solid #3a82ff;
  border-radius: 2px;
  color: #3a82ff;
  background: #fff;
  font-size: 12px;
  margin-right: 0.1rem;
  flex-shrink: 1;
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
</style>
