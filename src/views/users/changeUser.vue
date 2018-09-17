<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>修改个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  <el-form ref="form" :model="form" label-width="80px" class="changeForm">
  <el-form-item label="个性签名">
    <el-input
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入内容"
    v-model="form.desc">
    </el-input>
  </el-form-item>
  <el-form-item label="上传头像">
      <el-upload
      class="upload-demo"
      action="https://upload-z1.qiniup.com"
      :data= upload
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :multiple="false"
      >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <img :src="form.avatar" v-show="isShow">
  </el-form-item>
  <el-form-item label="邮箱">
      <el-input placeholder="请输入邮箱" v-model="form.email" >
       <template slot="append">.com</template>
      </el-input>
  </el-form-item>
  <el-form-item label="昵称">
    <el-input v-model="form.nickname" placeholder="请输入昵称" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">修改</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          desc:'',
          avatar:'',
          email:'',
          nickname:'',
        },
        imgData:'',
        isShow: false,
        upload:{
          token:''
        }
      }
    },
    methods:{
      onSubmit(form) {
      this.$axios.put('/user/userInfo',this.form).then(res => {
          console.log(res)
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.push('/layout/users')
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      onSuccess(res){
        this.form.avatar = res.url
        this.$message.success('上传成功')
        this.isShow = true
      },
      onError(){
        this.$message.error('上传失败');
      },
      onRemove(){
        this.isShow = false
      },
      getToken(){
        this.$axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          this.upload.token = res.data
        })
      }
    },
    created(){
      this.getToken()
    }
  }
</script>

<style scoped lang="scss">
   .changeForm{
    width: 700px;
    margin:0 auto;
    margin-top:20px;
     img{
     width: 50%;
     height: 50%;
    }
  }
</style>