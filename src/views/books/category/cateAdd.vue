<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加新分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="categoryForm"  label-width="100px" class="demo-categoryForm">
      <el-form-item label="类型名称" prop="title">
        <el-input v-model="categoryForm.title" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          action="https://upload-z1.qiniup.com"
          :data= upload
          :on-success="onSuccess"
          :on-error="onError"
          :on-remove="onRemove"
          :multiple="false">
          <img v-if="categoryForm.icon" :src="categoryForm.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">立即上传</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        categoryForm:{
          title:'',
          icon:''
        },
        upload:{
          token:''
        },
      }
    },
    methods:{
      getToken(){
        this.$axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          this.upload.token = res.data
        })
      },
      onSubmit(categoryForm) {
        this.$axios.post('/category',this.categoryForm).then( res => {
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.push('/layout/category')
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      onSuccess(res){
        this.categoryForm.icon = res.url
        this.$message.success('上传成功')
        this.isShow = true
      },
      onError(){
        this.$message.error('上传失败');
      },
      onRemove(){
        this.isShow = false
      },
    },
    created(){
      this.getToken()
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .demo-categoryForm{
    width: 600px;
    margin:0 auto;
    margin-top:60px;
  }
</style>