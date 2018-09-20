<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-carousel class="swiper">
      <el-carousel-item>
        <img src="../../assets/lunbotu.jpg">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/lunbotu2.jpg">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .swiper{
  width:1020px;
  margin:0 auto;
  margin-top:20px;
  }
</style>