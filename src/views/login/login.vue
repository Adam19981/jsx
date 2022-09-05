<template>
  <div class="loginMain">

    <i v-if="isShowUserImg" class="loginUser el-icon-s-custom" @click="handleShowForm" />

    <transition name="el-zoom-in-center">
      <div class="loginForm" v-if="!isShowUserImg">
        <h1>Log In</h1>
        <i class="formClose el-icon-circle-close" @click="handleShowForm"></i>
        <el-form :model="form" :rules='rules' ref='form' @submit.prevent.native>
          <el-form-item prop="userId">
            <el-input type="input" v-model="form.userId" clearable placeholder="请输入用戶名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="loginBtn" @click="handleLogin">Log in</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

  </div>
</template>

<script>
const changeUserId = (rule, value, callback) => {
  if (value!=='user'&&value!=='admin') {
    return callback(new Error('账号不存在'));
  }else{
    callback()
  }
}

export default {
  name: 'login',
  data() {
    return {
      form: {
        userId: '',
      },
      rules: {
        userId: [{required: true, message: '请输入用户名', trigger: 'blur'},
          { validator: changeUserId, trigger: 'blur' }]
      },
      isShowUserImg: true
    }
  },

  methods: {
    handleLogin() {
      this.$refs['form'].validate((valid) => {
        console.log(valid)
        if (valid) {
          const timestamp = new Date().getTime()+60*60*24*1000
          localStorage.setItem('timestamp',timestamp+'')
          localStorage.setItem('token', this.form.userId)
          this.$router.push({path: '/'})
        } else {
          console.log('false')
        }
      })
    },
    handleShowForm() {
      this.isShowUserImg =!this.isShowUserImg
    }
  }
}
</script>

<style scoped lang="less">
.loginMain {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
  background-image: url("~@/assets/login/loginBg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .loginUser {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
    font-size: 50px;
    text-align: center;
    line-height: 90px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.3);
  }

  /deep/ .el-input__inner {
    background-color: rgba(0, 0, 0, 0.12);
    border: none;
    color: #fff;
  }

  /deep/ .el-input__inner:hover{
    box-shadow: 0 0 4px rgba(0, 0, 0, 1);
  }

  /deep/ .el-form-item__error {
    color: #eee;

  }

  .loginForm {
    position: absolute;
    padding: 20px;
    width: 280px;
    height: 250px;
    margin-left: -140px;
    margin-top: -125px;
    top: 50%;
    left: 50%;
    background-color: rgba(3, 3, 3, 0.25);
    box-shadow: 1px 1px 50px #000;
    border-radius: 4px;

    .formClose{
      position: absolute;
      top:5px;
      right: 5px;
      cursor: pointer;
      font-size: 24px;
      color: rgba(3, 3, 3, 0.6);
    }
    .formClose:hover{
      color:#000
    }


    h1 {
      font-family: 'Open Sans Condensed', sans-serif;
      position: relative;
      margin-top: 0;
      text-align: center;
      font-size: 40px;
      color: #ddd;
      text-shadow: 3px 3px 10px #000;
    }


    .loginBtn {
      width: 80%;
      background-color: rgba(3, 3, 3, 0.5);
      border: none;
      color: #eee;
      margin-left: 10%;
    }
    .loginBtn:hover{
      box-shadow: 0 0 4px rgba(0, 0, 0, 1);
      font-weight: 700;
      color: white;
    }


  }
}

</style>