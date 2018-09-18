<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/users' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>信息详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <div class="details">
      <ul>
        <li>
          <p><span>用户名：</span>{{detailsData.data.username}}</p>
        </li>
        <li>
          <p><span>头像：</span><img :src="detailsData.data.avatar" ></p>
        </li>
        <li>
          <p><span>昵称：</span>{{detailsData.data.nickname}}</p>
        </li>
        <li>
          <p><span>简介：</span>{{detailsData.data.desc}}</p>
        </li>
        <li>
          <p><span>邮箱：</span>{{detailsData.data.email}}</p>
        </li>
        <li>
          <p><span>时间：</span>{{detailsData.data.updatedTime}}</p>
        </li>
        <li>
          <p><span style="margin-right:60px">ID:</span>{{detailsData.data._id}}</p>
        </li>
      </ul>
    </div>      -->
    <el-form ref="detailsData" :model="detailsData" label-width="80px" class="detailsDataForm">
        <el-form-item label="头像">
          <img :src="detailsData.data.avatar">
        </el-form-item>        
        <el-form-item label="姓名">
          <p>{{detailsData.data.username}}</p>
        </el-form-item>
        <el-form-item label="个性签名">
          <p>{{detailsData.data.desc}}</p>
        </el-form-item>
        <el-form-item label="邮箱">
            <p>{{detailsData.data.email}}</p>
           </el-form-item>
          <el-form-item label="昵称">
            <p>{{detailsData.data.nickname}}</p>
          </el-form-item>
          <el-form-item label="更新时间">
            <p>{{detailsData.data.updatedTime}}</p>
          </el-form-item>
          <el-form-item label="ID">
            <p>{{detailsData.data._id}}</p>
          </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        detailsData: {}
      }
    },
    methods: {
      getData() {
        this.detailsData = this.$route.query
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  // .details{
  //   margin-top: 20px;
  //   margin-left: 400px;
  //   ul{
  //   list-style-type: none;
  //    li{
  //     margin-bottom: 20px;
  //       span{
  //         margin-right: 20px;
  //         font-size: 24px;     
  //         color:#606266;     
  //       }
  //    }
  //   }
  .detailsDataForm{
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