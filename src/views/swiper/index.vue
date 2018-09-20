<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>轮播图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="swiperData">
      <el-table-column label="轮播图头图">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="swiperimg">
        </template>
      </el-table-column>
      <el-table-column label="轮播图标题" prop="title"></el-table-column>
      <el-table-column label="图书头图" prop="book.title">
        <template slot-scope="scope">
          <img :src="scope.row.book.img" class="bookimg">
        </template>
      </el-table-column>
      <el-table-column label="图书" prop="book.title"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="edit(scope.row._id)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="deleteSwiper(scope.row._id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pnChange"
        :total="swiperCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        swiperData: [],
        pn: 1,
        size: 5,
        swiperCount: 0
      }
    },
    methods: {
      getData() {
        this.$axios.get('/swiper', {pn: this.pn, size: this.size}).then(res => {
          this.swiperData = res.data
          this.swiperCount = res.count
        })
      },
      edit(id) {
        this.$router.push({name: 'editSwiper', query: {id}})
      },
      deleteSwiper(id) {
        this.$confirm('此操作将删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/swiper/delete', {ids: [id]}).then(res => {
            console.log(res)
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.getData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      pnChange(pn) {
        this.pn = pn
        this.getData()
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
  .bookimg {
    display: block;
    width: 150px;
    height: 200px;
  }

  .swiperimg {
    display: block;
    width: 200px;
    height: 100px;
  }

  .block{
      text-align: center;
    }
</style>