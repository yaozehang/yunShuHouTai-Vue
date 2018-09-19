<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/category' }">图书列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加新图书</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="cateBook"  label-width="100px" class="demo-cateBook">
      <el-form-item label="分类名" prop="title">
        <el-input v-model="cateBook.title" style="width:400px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="分类ID" prop="_id">
        <el-input v-model="cateBook._id" style="width:400px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="分类封面" prop="icon">
        <img :src="cateBook.icon" style="width:40%;height:40%">
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="cateBook.bookid">
          <el-option v-for="(item, index) in bookData"
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
      return{
        cateBook:{
          _id:'',
          bookid:'',
        },
        bookData:[]
      }
    },
    methods:{
      getData(){
        this.cateBook = this.$route.query.id
      },
      async getBook(){
        const res = await this.$axios.get('/book')
        this.bookData = res.data
      },
      onSubmit(){
        this.$axios.post(`/category/${this.cateBook._id}/book/${this.cateBook.bookid}`).then(res => {
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.go(-1)
          }else{
            this.$message.error(res.msg)
          }
        })
      }
    },
    created(){
      this.getData()
      this.getBook()
    }
  }
</script>

<style scoped>
  .demo-cateBook{
    width: 600px;
    margin:0 auto;
    margin-top:40px;
  }
</style>