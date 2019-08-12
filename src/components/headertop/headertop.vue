<template>
    <div class="header-top">
      <div class="title">
        <span>Carl-Admin</span>
      </div>
      <div class="header-right">
        <span>超级管理员</span>
        <el-dropdown>
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a href="/">网站首页</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "headertop"
    }
</script>

<style scoped>
.header-top{
  width: 100%;
  height: 60px;
  background-color: #409EFF;
  position: relative;
  left: 0;
  top: 0;
  color: #fff;
}
.title{
  width: 10%;
  height: 60px;
  float: left;
  text-align: center;
  line-height: 60px;
}
.header-right{
  width: 15%;
  height: 60px;
  line-height: 60px;
  float: right;
  text-align: center;
}
.el-dropdown-link{
  color: #fff;
}
.header-right a{
  color: #fff;
  text-decoration: none;
  display: inline-block;
  margin-left: 10px;
}
</style>
