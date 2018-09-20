<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/category' }">图书分类</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/bookAll' }">图书</el-breadcrumb-item>
        <el-breadcrumb-item>图书详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="bookData" :model="bookData" label-width="80px" class="bookDataForm">
        <el-form-item label="封面" >
          <img :src="bookData.img">
        </el-form-item>  
        <el-form-item label="书名">
          <p>{{bookData.title}}</p>
        </el-form-item>      
        <el-form-item label="作者">
          <p>{{bookData.author}}</p>
        </el-form-item>
        <el-form-item label="类型">
          <p>{{category.title}}</p>
        </el-form-item>
        <el-form-item label="简介">
          <p>{{bookData.desc}}</p>
        </el-form-item>
        <el-form-item label="正在观看">
            <p>{{bookData.looknums}}</p>
           </el-form-item>
          <el-form-item label="更新时间">
            <p>{{bookData.updateTime}}</p>
          </el-form-item>
          <el-form-item label="ID">
            <p>{{bookData._id}}</p>
          </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        bookData:{
          type:''
        },
        category:[]
      }
    },
    methods:{
      getData () {
        const id = this.$route.query.id
        this.$axios.get(`/book/${id}`).then(res => {
          res.data.updateTime = (new Date(res.data.updateTime)).toLocaleString()
          this.bookData = res.data    
        }).then(()=>{
            this.$axios.get(`/category/${this.bookData.type}`).then(res => {
            this.category = res.data
          })
        })
      },
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped>
  .bookDataForm{
    margin-top: 20px;
    padding-top: 20px;
    padding-right: 20px;
    background-color: #F2F6FC;
    border-radius: 6px;
  }
  img{
    width:200px;
    height:300px;
  }
</style>