<template>
  <div>
  <el-form ref="form" :model="form" label-width="80px" class="addForm">
  <el-form-item label="姓名">
    <el-input v-model="form.username" placeholder="请输入姓名" ></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password" placeholder="请输入密码" type="password" ></el-input>
  </el-form-item>
  <el-form-item label="个性签名">
    <el-input
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入内容"
    v-model="form.desc">
    </el-input>
  </el-form-item>
  <el-form-item label="上传头像">
      <el-upload
      class="upload-demo"
      action="https://upload-z1.qiniup.com"
      :on-success="onSuccess"
      :multiple="false"
      v-model="form.avatar">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-form-item>
  <el-form-item label="邮箱">
      <el-input placeholder="请输入邮箱" v-model="form.email" >
       <template slot="append">.com</template>
      </el-input>
  </el-form-item>
  <el-form-item label="昵称">
    <el-input v-model="form.nickname" placeholder="请输入昵称" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: '',
          password:'',
          desc: '',
          email: '',
          nickname:'',
          avatar:'',
        }
      }
    },
    methods: {
      onSubmit(form) {
        this.$axios.post('/user',this.form).then( res => {
          this.$message.success(res.msg)
        })
      },
      onSuccess(){
        this.$message.success('上传成功')
      }
    }
  }
</script>

<style scoped>
  .addForm{
    width: 700px;
    margin:0 auto
  }

</style>