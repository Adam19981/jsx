<template>
<div class="loginMain">
    <el-form  :model="form"  :rules='rules' ref='form' label-width="100px" class="logins">
     <h3 class="login_title">系统登录</h3>
     <el-form-item label='用户' label-width="80" prop="userId">
        <el-input type="input" v-model="form.userId" clearable  placeholder="请输入用戶名"></el-input>
     </el-form-item>
     <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
     </el-form-item>
</el-form>
</div>
</template>

<script>

export default {
    name:'login',
    data() {
        return {
            form:{
              userId:'',
            },
            rules:{
              userId:[{required:true,message:'请输入用户名',trigger:'blur'}]
            }
        }
    },
    methods:{
      handleLogin(){
        this.$refs['form'].validate((valid)=>{
          console.log(valid)
          if (valid){
            localStorage.setItem('token',this.form.userId)
            this.$router.push({ path:'/' })
          }else {
            console.log('false')
          }
        })
        }
    }
}
</script>

<style>
.logins{
    border-radius: 15px;
    background-clip: padding-box;
    width: 300px;
    border:1px solid #DCDFE6;
    margin:100px auto;
    padding: 10px 0 10px 20px;
}
.el-input{
    width: 200px;
}
.login_title{
    margin-left: 100px;
}
</style>