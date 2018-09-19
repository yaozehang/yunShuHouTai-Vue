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
      <el-form-item label="图书链接" prop="url">
        <el-input v-model="newBook.url" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="newBook.author" style="width:400px;"></el-input>
      </el-form-item>
       <el-form-item label="书籍头图">
        <el-switch
          v-model="isUpload"
          active-text="手动上传"
          inactive-text="头图网址">
        </el-switch>
        <el-input v-model="newBook.img" v-if="!isUpload"></el-input>
        <el-upload
          class="avatar-uploader"
          action="https://upload-z1.qiniup.com"
          :data= upload
          :on-success="onSuccess"
          :on-error="onError"
          :on-remove="onRemove"
          :multiple="false"
          v-else>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        <img :src="newBook.img" v-show="isShow">
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="newBook.typeId">
          <el-option v-for="(item, index) in categoryData"
                     :key="index"
                     :label="item.title"
                     :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onSubmit">立即上传</el-button>
      </el-form-item>
    </el-form>
  </div>    
</template>

<script>
  export default {
    data(){
      return {
        newBook:{
          url:'',
          author:'',
          img:'',
          typeId:'',
        },
        upload:{
          token:''
        }, 
        categoryData: [],
        isUpload: false,     
        isShow:false  
      }
    },
    methods:{
      async getCategoryData() {
        const res = await this.$axios.get('/category')
        this.categoryData = res.data
      },
      getToken() {
        this.$axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          this.upload.token = res.data
          })
        },
      onSubmit(newBook) {
        this.$axios.post('/book',this.newBook).then( res => {
          if(res.code == 200){
            console.log(res)
            this.$message.success(res.msg)
            this.$router.push('/layout/bookAll')
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      onSuccess(res) {
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
      this.getCategoryData()
    }
  }
</script>

<style scoped>
  .demo-newBook{
    width: 600px;
    margin:0 auto;
    margin-top:50px;
  }
</style>