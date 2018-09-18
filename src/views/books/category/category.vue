<template>
  <div class="books-category">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图书分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data=categoryData class="cateTable" border style="margin-top:20px">
      <el-table-column
        prop="icon"
        label="书籍icon"
        width="200">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="icon">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="图书分类名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="index"
        label="序号"
        width="70">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="ID"
        width="220">
      </el-table-column>
        <el-table-column label="操作" width="270">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row._id)" size="small" type="primary">
              查看详细
            </el-button>
            <el-button @click="handleEdit(scope.row._id)"  size="small" type="danger">
              修改
            </el-button>
            <el-button @click="handleDelete(scope.row._id)"  size="small" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        categoryData:[],
      }
    },
    methods:{
      getCategory(){
        this.$axios.get('/category',{"size":100}).then(res => {
            if(res.code == 200){
            this.categoryData = res.data
          }
        })
      },
      handleDetails(id){
        this.$router.push({name:'cateBooks',query:{id}})
      },
      handleEdit(id){
        this.$router.push({name:'cateEdit',query:{id}})
      },
      handleDelete(id){
        this.$confirm('此操作将永久删除一个书籍分类, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/category/${id}`).then(res => {
            this.$message.success(res.msg)
            this.getCategory()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    created(){
      this.getCategory()
    }
  }
</script>

<style scoped lang="scss">
    .books-category{
      .cateTable{
            width: 880px;
            margin:0 auto;
            text-align: center;
      }

     .icon{
      width: 150px;
      height:150px;
      }
  }
</style>