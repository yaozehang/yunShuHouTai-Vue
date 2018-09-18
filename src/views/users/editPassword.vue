<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="passwordData" status-icon :rules="rules" ref="passwordData" label-width="100px" class="passwordForm">
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="passwordData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input type="password" v-model="passwordData.new_password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(passwordData)">提交</el-button>
        <el-button @click="resetForm('passwordData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      const validatePass = (rule, value, callback)=> {
      if (value && value.length>=5) {
          callback();
        } else {                               
          callback(new Error('请输入合法密码'));          
        }
    };
      const validatePass2 = (rule, value, callback) => {
      if (value && value.length>=5) {
          callback();
        } else {                               
          callback(new Error('请输入合法密码'));          
        }
      };
      return {
        passwordData: {
          new_password:'',
          password:'',
        },
        rules: {
          password: [{ validator: validatePass, trigger: 'blur' }],
          new_password: [{ validator: validatePass2, trigger: 'blur' }],
        }
      }
    },
    methods:{
      handleEdit(){
        this.$axios.put('/user/password',this.passwordData).then(res => {
          console.log(res)
          if(res.code == 200){
            this.$message.success('修改成功')
          }else{
            this.$message.error('修改失败')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      submitForm(passwordData) {
        this.$refs["passwordData"].validate((valid) => {
          if (valid) {
            this.handleEdit();
          } else {
            return false;
          }
        });
      },
      resetForm(passwordData) {
        this.$refs["passwordData"].resetFields();
      }
    }
  
  }
</script>

<style scoped>
  .passwordForm {
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
  }
</style>