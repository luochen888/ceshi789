<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
		<div class="logImg"><img src="../assets/image/timg1.png" alt=""></div>
      <h3 class="title">警用装备管理系统</h3>
      <el-form-item prop="username">
		  <div class="logper"><img src="../assets/image/touxiang.png" alt=""></div>
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
		  <div class="logper"><img src="../assets/image/mimasuo.png" alt=""></div>
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>

      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">立即登录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
      <span>Copyright © 2018-2019 ruoyi.vip All Rights Reserved.</span>
    </div> -->
  </div>
</template>

<script>

import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {

      cookiePassword: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
   
    this.getCookie();
  },
  methods: {

    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
	@media only screen and (min-width:1440px ) {
		.login {
			width: 1920px;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  height: 100%;
		  background-image: url("../assets/image/bg.jpg");
		  background-size: 100% 100%;
		}
	}
	@media only screen and (min-width: 1280px) and (max-width: 1440px){
		.login {
			width: 1440px;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  height: 100%;
		  background-image: url("../assets/image/bg.jpg");
		  background-size: 100% 100%;
		}
	}
	@media only screen and (max-width: 1280px) {
		.login {
			width: 1280px;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  height: 100%;
		  background-image: url("../assets/image/bg.jpg");
		  background-size: 100% 100%;
		}
		
	}
	.logper{
		position: absolute;
		z-index: 100;
		left: 10px;
		top: 5px;
		}
		.logper img{
			width: 30px;
		}
		.logImg{
			display: flex;
			justify-content: center;
			padding-bottom: 10px;
		}
		.logImg img{
			width: 70px;
		}
	
	.title {
	  margin: 0px auto 30px auto;
	  text-align: center;
	  color: white;
	  font-size: 20px;
	}
	.login-form {
	  border-radius: 6px;
	  background-image: url("../assets/image/juxingbeijing.png");
	  background-size: 100% 100%;
	  background-repeat: no-repeat;
	  width: 545px;
	  height: 584px;
	  padding-top: 70px;
	  color: white;
	  .el-form-item{
		  padding: 10px 80px;
		 .el-input {
	    height: 38px;
	    input {
	      height: 38px;
		  background: transparent;
		      border: none;
		      outline: medium;
		      border-bottom: #A4C0E8 2px solid;
			  padding-left: 50px;
			  color: white;
	    }
	  }
	  .input-icon {
	    height: 39px;
	    width: 14px;
	    margin-left: 2px;
	  } 
	  }
	  .el-checkbox{
		  padding: 10px 80px; 
	  }
	}
	.el-button{
		height: 30px;
	}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
