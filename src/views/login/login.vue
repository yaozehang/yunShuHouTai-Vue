<template>
  <div class="container">
    <h1 class="title">欢迎来到cloud-book后台管理系统</h1>
    <div class="login-box">
      <h2 class="login-box-title">请登录</h2>
      <el-form class="form" :rules="rules" ref="formData" :model="formData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" @keyup.enter.native="validateLogin" ></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="validateLogin"  type="primary" class="login-btn" :loading="isLoading"> 
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
    const validateUsername = (rule, value, callback)=> {
      if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback()
        }
    };
    const validatePass = (rule, value, callback) => {
      if (value && value.length>=5) {
          callback();
        } else {                               
          callback(new Error('请输入合法密码'));          
        }
      };
      return {
        formData: {
          username:'',
          password:''
        },
        isLoading:false,
        rules:{
          username:[ { validator: validateUsername, trigger: 'blur' }],
          password:[ { validator: validatePass, trigger: 'blur' }]
        }
      }
    },
    methods: {
      handleLogin() {
        this.isLoading = true
        this.$axios.post('/login',this.formData).then(res => {
          console.log(res)
          if(res.code == 200){
            this.$store.commit('CHANGE_USERINFO',res.data)
            this.$message.success('登录成功')
            setTimeout(() => {
              this.$router.push('/layout')
            }, 1000)
          }else{
            this.$message.error('登录失败')
          }
          this.isLoading = false
        }).catch(err => {
          this.isLoading = false
        })
      },
      validateLogin(formData) {
        this.$refs["formData"].validate((valid) => {
          if (valid) {
           this.handleLogin();
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  .container {
    overflow: hidden;
    min-height: 100vh;
    background-color: #545c64;

    .title{
      margin-top: 80px;
      text-align: center;
      color:#fff;
      font-weight: 400;
    }

    .login-box {
      width: 400px;
      height: 300px;
      border:1px solid #e8e8e8;
      background-color: #fff;
      border-radius: 6px;
      padding: 40px;
      margin:20px auto 0;

      .login-box-title{
        color:#333;
        font-weight: 400;
        text-align: center;
      } 

      .form {
        margin-top: 20px;
      }
      .login-btn{
        width: 100%;
        box-sizing:border-box;
      }
    }
  }
</style>