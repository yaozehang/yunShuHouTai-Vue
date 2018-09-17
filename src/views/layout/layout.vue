<template>
  <div class="layout">
    <div class="header ml-200">
      <h1 class="title">
        云书后台操作系统
        <img :src="$route.params.avatar" class="avatar" >
      </h1>
    </div>
    <div class="side-bar ">
        <el-menu
        :router = true
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户</span>
          </template>
          <el-menu-item index="/layout/index">首页</el-menu-item>
          <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index="/layout/users">用户管理</el-menu-item>
            <el-menu-item index="/layout/addUsers">添加新用户</el-menu-item>
            <el-menu-item index="/layout/changeUser">修改个人信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="登录注销">
            <el-menu-item index="/login">登录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
          <i class="el-icon-menu"></i>
            <span>图书</span>
          </template>
          <el-menu-item-group>
            <template slot="title">图书管理</template>
            <el-menu-item index="/layout/category">图书分类</el-menu-item>
            <el-menu-item index="/layout/cateAdd">添加分类</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main-content ml-200">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar:''
    }
  },
  methods: {
  },
  created(){
    console.log(this.$route.params.avatar)
  }
};
</script>

<style scoped lang="scss">
.layout {
  .header{
    background-color: #434a50;
    color: #f1f1f1;
  }
  .title {
    text-align: center;
    font-weight: 400;
    line-height: 60px;
    height: 60px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 20px;
  }
  .ml-200 {
    margin-left: 200px;
  }
  .side-bar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 200px;
    overflow: hidden;
    background-color: #545c64;
    padding-top: 80px;

    /deep/{
      .el-menu-vertical-demo{
        border-right:none;
      }
    }
  }
  .main-content{
    padding: 15px;
  }
}
</style>