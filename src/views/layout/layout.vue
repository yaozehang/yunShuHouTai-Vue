<template>
  <div class="layout">
    <div class="header ml-200">
      <h1 class="title">
        云书后台操作系统
        <img :src="avatar" class="avatar" >
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link" @click="handleMine">
            图片
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleMine">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleEdit">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="handleLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>                     
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
            <el-menu-item index="/layout/addUsers">添加用户</el-menu-item>
            <el-menu-item index="/layout/changeUser">修改信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
          <i class="el-icon-menu"></i>
            <span>图书</span>
          </template>
          <el-menu-item-group>
            <template slot="title">图书管理</template>
            <el-menu-item index="/layout/bookAll">图书列表</el-menu-item>
            <el-menu-item index="/layout/bookAdd">添加图书</el-menu-item>
            <el-menu-item index="/layout/category">图书分类</el-menu-item>
            <el-menu-item index="/layout/cateAdd">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
        <template slot="title">
        <i class="el-icon-document"></i>
          <span slot="title">轮播图</span>
        </template>
        <el-menu-item-group>
            <template slot="title">轮播图管理</template>
            <el-menu-item index="/layout/swiper">轮播图列表</el-menu-item>
            <el-menu-item index="/layout/addSwiper">添加轮播图</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
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
    initData(){
        this.avatar = this.$store.state.userinfo.avatar 
      },
    handleMine(){
        this.$router.push('/layout/userMine')
    },
    handleEdit(){
        this.$router.push('/layout/editPassword')
    },
    handleLogin(){
      this.$confirm('是否退出登录?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get('/logout').then( res => {
            this.$message.success(res.msg)
            this.$router.push('/login')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });          
        })     
    },
  },
    created(){
      this.initData()
    }
};
</script>

<style scoped lang="scss">
.layout {
  .header{
    background-color: #434a50;
    color: #f1f1f1;
    img{
      position: absolute;
      top:0;
      right: 0;
      margin: 3px 10px 0px 0;
      border:1px solid #434a50;
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    .dropdown{
      position: absolute;
      top:0;
      right: 0;
      margin: -2px 6px 0px 0;
      height: 50px;

      .el-dropdown-link{
        font-size: 35px;
        cursor: pointer;
        opacity:0;
      }
    }
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