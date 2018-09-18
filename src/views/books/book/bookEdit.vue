<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/category' }">图书分类</el-breadcrumb-item>
        <el-breadcrumb-item>添加新图书</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="newBook"  label-width="100px" class="demo-newBook">
      <el-form-item label="书名" prop="title">
        <el-input v-model="newBook.title" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="ID" prop="_id">
        <el-input v-model="newBook._id" style="width:400px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="索引" prop="index">
        <el-input v-model="newBook.index" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input v-model="newBook.desc" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="newBook.author" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="newBook.type" style="width:400px;"></el-input>
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
          <img v-if="newBook.img" :src="newBook.img" class="avatar">
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
      return {
        newBook:{
          book_id:'',
          title:'',
          index:'',
          desc:'',
          author:'',
          img:'',
          type:'',
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
      onSubmit(newBook) {
        this.newBook = this.$route.query.id;
        this.$axios.post('/book',this.newBook).then( res => {
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.push('/layout/category')
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      onSuccess(res){
        this.newBook.img = res.url
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
  .demo-newBook{
    width: 600px;
    margin:0 auto;
    margin-top:20px;
  }
</style>