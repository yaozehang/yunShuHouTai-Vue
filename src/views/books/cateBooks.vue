<template>
  <div class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/layout/category' }">图书分类</el-breadcrumb-item>
        <el-breadcrumb-item>图书</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      :data="categBooksData"
      border
      style="width: 100%;margin-top:20px" class="spHeight">
      <el-table-column
        prop="updateTime"
        label="更新日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="author"
        label="姓名"
        width="110">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="简介"
        width="300">
      </el-table-column>
      <el-table-column
        prop="img"
        label="书籍封面"
        width="220">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="avatar">
        </template>
      </el-table-column>
      <el-table-column
        prop="index"
        label="索引"
        width="30">
      </el-table-column>
      <el-table-column
        prop="looknums"
        label="正在观看"
        width="80">
      </el-table-column>
      <el-table-column
        prop="title"
        label="书籍名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="ID"
        width="220">
      </el-table-column>
    </el-table>  
  </div>
</template>

<script>
  export default {
    data(){
      return {
        categBooksData:[]
      }
    },
    methods: {
      getData () {
        const id = this.$route.query.id
        this.$axios.get(`/category/${id}/books`).then(res => {
          console.log(res.data.books)
          this.categBooksData = res.data.books
        })
      },
    },
    created(){
      this.getData ()
    }
  }
</script>

<style scoped lang="scss">
</style>