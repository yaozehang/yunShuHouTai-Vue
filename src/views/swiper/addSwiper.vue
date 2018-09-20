<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="formData" class="addForm">
      <el-form-item label="轮播图标题">
        <el-input v-model="formData.title" placeholder="请输入标题" style="width:500px;"></el-input>
      </el-form-item>
      <el-form-item label="轮播图类型">
        <el-select v-model="formData.categoryId" @change="categoryChange">
          <el-option  v-for="(item, index) in categoryData" 
                      :key="index"
                      :label="item.title"
                      :value="item._id">
          </el-option>
        </el-select>

        <div class="book-item clearfix" v-if="getBookItem[0]">
          <div class="img-wrap">
            <img :src="getBookItem[0].img">
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
            <el-upload
            class="upload-demo"
            action="https://upload-z1.qiniup.com"
            :data= upload
            :on-success="onSuccess"
            :on-error="onError"
            :on-remove="onRemove"
            :multiple="false"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <img :src="formData.img" v-show="isShowImg">
        </el-form-item>

        <el-form-item label="轮播图排序">
          <el-input-number v-model="formData.index" :min="1"></el-input-number>
        </el-form-item>

        <el-button type="primary" @click="handleSubmit" v-if="$route.name == 'addSwiper'">
          提交
        </el-button>
        <el-button type="primary" @click="handleSaveEdit" v-else>
          保存更改
        </el-button>
        <el-button @click="onCancel">取消</el-button>
    </el-form>


    <el-dialog title="书籍列表" :visible.sync="isShow">
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
      <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="4"
            layout="total, prev, pager, next"
            :total="bookCount">
          </el-pagination>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          title: '',
          img: '',
          book: '',
          index: '',
          categoryId:''
        },
        upload: {
        token: ""
      },
        categoryData:[],
        bookData:[],
        bookCount:0,
        isShow:false,
        isShowImg:false
      }
    },
    methods:{
      getCategory(){
        this.$axios.get('/category',{size:100}).then(res => {
          this.categoryData = res.data
        })
      },
      getBook(pn){
        this.$axios.get(`/category/${this.formData.categoryId}/books`,{pn}).then(res => {
          this.bookData = res.data.books
          this.bookCount = res.count
        })
      },
      categoryChange(){
        this.isShow = true
        this.getBook()
      },
      handleAddBook(id){
        this.formData.book = id
        this.isShow = false
      },
      handleSubmit(){
        let isCanSubmit = true
        for(let key in this.formData){
          if(!this.formData[key]){
            isCanSubmit = false
          }
        }
        if(isCanSubmit) {
          this.$axios.post('/swiper', this.formData).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push('/layout/swiper')
            }
          })
        } else { // 缺少必要参数
          this.$message.error('缺少必要参数')
        }
      },
      getInitData(){
        this.$axios.get(`/swiper/${this.$route.query.id}`).then(res => {
          this.formData = {
            ...this.formData,
            ...res.data,
            book: res.data.book._id, // 回填书籍id
            categoryId: res.data.book.type // 回填分类id
          }
          this.getBook()
        })
      },
      handleSaveEdit(){
        this.$axios.put(`/swiper/${this.$route.query.id}`,this.formData).then(res => {
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.push('/layout/swiper')
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      onSuccess(res) {
      this.formData.img = res.url;
      this.$message.success("上传成功");
      this.isShowImg = true;
    },
      onError() {
        this.$message.error("上传失败");
      },
      onRemove() {
        this.isShow = false;
      },
      getToken() {
        this.$axios.get("http://upload.yaojunrong.com/getToken").then(res => {
          this.upload.token = res.data;
        });
      },
      handleCurrentChange(val){
        this.getBook(val)
      },
      onCancel(){
        this.$message.success('取消成功')
        this.$router.go(-1)
      }
    },
    created(){
      this.getCategory()
      if(this.$route.name == 'editSwiper'){
        this.getInitData()
      }
      this.getToken()
    },
    computed:{
      getBookItem(){
        if(this.formData.book){
          return this.bookData.filter(item => item._id == this.formData.book)
        } else {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .clearfix::after {
    content:'';
    display:block;
    clear: both;
    height: 0;
    width: 0;
  }

  .addForm {
  width: 700px;
  margin: 0 auto;
  margin-top: 20px;
  img {
    width: 50%;
    height: 50%;
  }
}

  .book-item {
    margin-top: 20px;
    width: 430px;
    padding: 15px;
    border: 1px solid #999;
    border-radius: 4px;
    .img-wrap {
      float: left;
      width: 100px;
      height: 120px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .book-desc {
      float: left;
      margin-left: 20px;
      .title {
        color: #333;
        font-weight: 700;
        font-size: 15px;
      }
      .author {
        color: #555;
      }
    }
  }

  .img-item{
    width: 60px;
    height: 70px;
  }

  .block{
      text-align: center;
    }
</style>