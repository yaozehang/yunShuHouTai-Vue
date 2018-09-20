<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="userinfo" :model="userinfo" label-width="80px" class="userinfoForm">
        <el-form-item label="头像">
          <img :src="userinfo.avatar">
        </el-form-item>        
        <el-form-item label="姓名">
          <p>{{userinfo.username}}</p>
        </el-form-item>
        <el-form-item label="个性签名">
          <p>{{userinfo.desc}}</p>
        </el-form-item>
        <el-form-item label="邮箱">
            <p>{{userinfo.email}}</p>
           </el-form-item>
          <el-form-item label="昵称">
            <p>{{userinfo.nickname}}</p>
          </el-form-item>
          <el-form-item>
            <el-button @click="toEdit" size="big" type="primary">
              修改
            </el-button>
          </el-form-item>
    </el-form>
    </div>    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userinfo: {}
      }
    },
    methods: {
      initData() {
        this.userinfo = this.$store.state.userinfo
      },
      toEdit(){
        this.$router.push('/layout/changeUser')
      }
    },
    created(){
      this.initData()
    }
  }
</script>

<style scoped lang="scss">
  .userinfoForm{
    width: 400px;
    margin: 0 auto;
    margin-top: 40px;

    p{
      margin-left: 20px;
    }

    img{
      width: 80px;
      height: 80px;
      margin-left: 20px;
      border-radius: 50%;
    }
  }
</style>