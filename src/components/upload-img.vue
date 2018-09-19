<template>
  <div>
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
  </div>
</template>

<script>
  export default {
    data(){
      return {
        upload:{
          token:''
        },
      }
    },
    methods:{
      getToken(){
        this.$axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          this.upload.token = res.data
        })
      },
      onSuccess(res){
        this.$message.success('上传成功')
        this.isShow = true
      },
      onError(){
        this.$message.error('上传失败');
      },
      onRemove(){
        this.isShow = false
      },
    },
    created() {
    this.getToken();
    }
  }
</script>

<style scoped>

</style>