<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图书列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <el-table
      :data="booksData"
      border
      style="margin-top:20px" class="spHeight">
      <el-table-column
        prop="img"
        label="书籍封面"
        width="220">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="avatar" style="width:200px;height:300px;">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="书籍名称"
        width="160">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="90">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="简介"
        width="300">
      </el-table-column>
      <el-table-column
        prop="looknums"
        label="正在观看"
        width="80">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新日期"
        width="200">
      </el-table-column>
      <el-table-column label="操作" width="270">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row._id)" size="small" type="primary">
              查看详细
            </el-button>
            <el-button @click="handleEdit(scope.row)"  size="small" type="danger">
              编辑
            </el-button>
            <el-button @click="handleDelete(scope.row._id)"  size="small" type="danger">
              删除
            </el-button>
          </template>
        </el-table-column>
    </el-table>  
      <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        booksData:[],
        count:0,
      }
    },
    methods: {
      getData (pn) {
        this.$axios.get('/book',{pn,size:100}).then(res => { 
          let newArr = res.data   
          newArr.forEach(item => {
          let updateTime = (new Date(item.updateTime)).toLocaleString()
          item.updateTime = updateTime
          })
          this.booksData = res.data  
          this.count = res.data.length
        })
      },
      handleDetails(id){
        this.$router.push({name:'bookDetail',query:{id}})
      },
      handleEdit(row){
        this.$router.push({name:'bookEdit',query:{row}})
      },
      handleDelete(id){
        this.$confirm('此操作将永久删除一本书籍, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/book/${id}`).then(res => {
            this.$message.success(res.msg)
            this.getData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleCurrentChange(val){
        this.getData(val)
      },
    },
    created(){
      this.getData ()
    }
  }
</script>

<style scoped>
.block{
      text-align: center;
    }
</style>