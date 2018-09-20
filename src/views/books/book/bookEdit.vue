<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/bookAll' }">图书列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加新图书</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="newBook"  label-width="100px" class="demo-newBook">
      <el-form-item label="书名" prop="title">
        <el-input v-model="newBook.title" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="ID" prop="_id">
        <el-input v-model="newBook.book_id" style="width:400px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="index">
        <el-input-number v-model="newBook.index" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input v-model="newBook.desc" style="width:400px;" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="newBook.author" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="newBook.type">
          <el-option v-for="(item, index) in category"
                     :key="index"
                     :label="item.title"
                     :value="item._id"
          ></el-option>
        </el-select>
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
        <el-button @click="onCancel">取消</el-button>
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
        category:[]        
      }
    },
    methods:{
      getToken(){
        this.$axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          this.upload.token = res.data
        })
      },
      getData(){
        const id = this.$route.query.row._id
        this.$axios.get(`/book/${id}`).then(res => {
          this.newBook = res.data
          this.newBook.book_id = res.data._id
        })
        this.$axios.get(`/category/${this.newBook.type}`).then(res => {
          this.category = res.data
        })
      },
      onSubmit(newBook) {
        this.$axios.put('/book',this.newBook).then( res => {
          if(res.code == 200){

            this.$message.success(res.msg)
            this.$router.go(-1)
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
      onCancel(){
        this.$message.success('取消成功')
        this.$router.push('/layout/bookAll')
      }
    },
    created(){
      this.getToken()
      this.getData()
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