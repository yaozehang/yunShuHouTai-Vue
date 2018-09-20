<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/category' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="category"  label-width="100px" class="demo-category">
      <el-form-item label="分类标题" prop="title">
        <el-input v-model="category.title" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="分类排序" prop="index">
        <el-input-number v-model="category.index" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="ID" prop="_id">
        <el-input v-model="category._id" style="width:400px;" :disabled="true"></el-input>
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
          <img v-if="category.icon" :src="category.icon" class="avatar">
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
      return{
        category:{
          title:'',
          icon:'',
          index:'',
          _id:''
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
      getData(){
        this.category = this.$route.query.id
      },
       onSubmit() {
        const id = this.category._id
        this.$axios.put(`/category/${id}`,this.category).then( res => {
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.go(-1)
          }else{
            this.$message.error(res.msg)
          }
        })
      },
       onSuccess(res){
        this.category.icon = res.url
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
        this.$router.push('/layout/category')
      }
    },
    created(){
      this.getToken()
      this.getData()
    }
}
</script>

<style scoped lang="scss">
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
  .demo-category{
    width: 600px;
    margin:0 auto;
    margin-top:20px;
  }

</style>