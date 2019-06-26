<template>
  <div class="container">
    <div class="login">
      <div class="login-head">欢迎使用
        <span>车况查询</span>
      </div>
      <mt-field label="手机号码" placeholder="请输入手机号" type="tel" v-model="userTel" :attr="{ maxlength: 11 }"></mt-field>
      <mt-field style="border-bottom: 0" label="验证码" placeholder="请输入验证码" type="number" v-model="code" :attr="{ maxlength: 4 }" disableClear>
        <mt-button size="small" class="login-code-btn" :disabled="canGetCode" @click="sendCode">{{btnText}}</mt-button>
      </mt-field>
      <div></div>
    </div>
    <div class="login-cell-wrapper">
      <mt-button type="default" class="login-btn" size="large" :disabled="canLoginbtn" @click="goLogin">登录</mt-button>
      <!-- <p class="login-annotation">登录即代表您已同意
        <span @click="gotoRule">《服务协议》</span>
      </p> -->
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import axios from 'axios';
// import store from "../store";
export default {
  data() {
    return {
      isLogin: true,
      redirect: "",
      userTel: "",
      code: "",
      btnText: "获取验证码",
      canGetCode: true,
      leftTime: 60,
      timer: null,
      canLoginbtn: true
    };
  },
  mounted() {
    document.getElementById('title').innerHTML = this.$route.name
  },
  methods: {
    sendCode: function() {
      this.canGetCode = true;
      this.leftTime = 60;
      this.btnText = this.leftTime + "s 后重发";
      this.timer = setInterval(this.enableResend, 1000);
      let param = {
        tel: this.userTel
      };
      axios({
          url:"/v5/user/code",
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
      axios.post("/v5/user/login", param).then((res) => {
         console.log(res.data.code,"登陆页面login的code值")
        if (res.data.code > 0) {
          Toast({
            message: res.data.msg,
            position: "middle",
            duration: 3000
          });
        } else {
          console.log(res,"!!!!")
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

          // this.$router.push('/user');
          this.$router.replace(this.$route.query.path);
          
        }
      });
    },
  },
  watch: {
    userTel: function(val) {
      let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      if (reg.test(val)) {
        this.canGetCode = false;
      } else {
        this.canGetCode = true;
      }
    },
    code: function(val) {
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
.container {
  width: 100%;
  background: #f8f8f8;
}
.login-head {
  font-size: 0.22rem;
  color: #24252d;
  margin: 0.1rem 0 0.3rem 0;
  font-weight: bold;
  letter-spacing: 1px;
}
.login-head span {
  color: #3a82ff;
}
.login-cell-wrapper {
  font-size: 0.17rem;
  margin: 0.6rem 0.15rem;
  color: #24252d;
}
.login-border {
  border-top: 0.5px solid #eaeaea;
}
.login-code-btn {
  border: 1px solid #3a82ff;
  border-radius: 2px;
  color: #3a82ff;
  background: #fff;
  font-size: 12px;
}
.login-btn {
  width: 100%;
  /* background-image: linear-gradient(40deg, #ff7c00 0%, #fe5a00 100%); */
  background-image: linear-gradient(151deg, #537eff 0%, #105ff8 100%);
  box-shadow: 0 2.5px 7.5px 0 rgba(58, 130, 255, 0.15);
  border-radius: 2px;
  border-radius: 0.02rem;
  color: #fff;
  font-size: 0.18rem;
  margin-top: 0.8rem;
  height: 0.5rem;
}
.login-annotation {
  color: #aaaaaa;
  font-size: 0.12rem;
  padding: 10px 0;
}
.login-annotation span {
  color: #3a82ff;
}
.login {
  margin: 0.15rem;
  padding: 0.15rem;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 #efefef;
  border-radius: 2px;
  padding-bottom: 0;
}
</style>
<style>
.mint-field .mint-cell-title {
  width: 0.85rem !important;
}
.login .mint-cell-wrapper {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
