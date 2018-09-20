<template>
  <div class="user-manage">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data=tableData class="usersTable" border style="margin-top:20px">
      <el-table-column
        prop="nickname"
        label="姓名"
        width="130">
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="日期"
        width="130">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="个性签名"
        width="400">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="用户头像"
        width="80">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="avatar">
        </template>
      </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row)" size="small" type="primary">
              查看详细
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
            :page-size="10"
            layout="total, prev, pager, next"
            :total="count">
          </el-pagination>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        count:0
      }
    },
    methods:{
      getData(pn){
        this.$axios.get('/user',{pn}).then(res => {
          if(res.code == 200){
            let newArr = res.data   
            newArr.forEach(item => {
            let updatedTime = (new Date(item.updatedTime)).toLocaleString()
              item.updatedTime = updatedTime
            })
            this.tableData = res.data
            this.count = res.count
          }
        })
      },
      handleDetails(data){
        this.$router.push({path:'/layout/detailsUsers',query:{"data":data}})
      },
      handleDelete(id){
        this.$confirm('此操作将永久删除一位管理员, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/user/delete',{userIds:[id]}).then(res => {
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
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .user-manage{
    .usersTable{
      width: 921px;
      height: 250;
      margin: 0 auto;
    }

    .avatar{
      width: 60px;
      height: 60px;
    }

    .block{
      text-align: center;
    }
  }
</style>