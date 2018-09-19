<template>
  <div>
    <template>
  <div class="add-swiper-demo">
    <el-form :model="swiperData" class="form-500">
      <el-form-item label="轮播图标题">
        <el-input v-model="swiperData.title"></el-input>
      </el-form-item>
      <el-form-item label="轮播图书籍">
        <el-select v-model="swiperData._id" @change="swiperChange">
          <el-option v-for="(item, index) in categoryData"
                     :key="index"
                     :label="item.title"
                     :value="item._id"
          ></el-option>
        </el-select>

          <div class="book-item clearfix" v-if="getBookItem[0]">
            <div class="img-wrap">
              <img :src="getBookItem[0].img" >
            </div>
            <div class="book-desc">
              <div class="title">
                标题: {{getBookItem[0].title}}
              </div>
              <div class="author">
                作者: {{getBookItem[0].author}}
              </div>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="轮播图头图">
          <upload-img v-model="formData.img" class="fll"></upload-img>
        </el-form-item>

        <el-form-item label="轮播图排序">
          <el-input-number v-model="formData.index" :min="1"></el-input-number>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="handleSubmit" v-if="$route.name == 'addSwiperDemo'">
        提交
      </el-button>
      <el-button type="primary" @click="handleSaveEdit" v-else>
        保存更改
      </el-button>

      <el-dialog title="书籍列表" :visible.sync="isShowDialog">
        <el-table :data="bookData">
          <el-table-column property="title" label="书名" width="150"></el-table-column>
          <el-table-column label="书籍头图" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="img-item">
            </template>
          </el-table-column>
          <el-table-column property="author" label="作者"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleAddBook(scope.row._id)">
                添加
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-dialog>
    </div>
  </template>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        swiperData:{
          title: '',
          img: '',
          book: '',
          index: '',
          _id:''
        },
        swiperEdit:{}
      }
    },
    methods:{
      initData(){
        this.swiperData = this.$route.query.row
      },
      onSubmit(){
        this.$axios.put(`/swiper/${this.swiperData._id}`,this.swiperEdit).then(res => {
          
        })
      }
    },
    created(){
      this.initData()
    }
  }
</script>

<style scoped>

</style>