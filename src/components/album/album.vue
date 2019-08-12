<template>
  <div class="album">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>相册管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="article-btn">
      <el-button type="primary" icon="el-icon-plus" plain="" @click="addAlbum">添加相册</el-button>
    </div>
    <el-row>
      <el-col :span="4" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://element.eleme.cn/2.0/static/hamburger.50e4091.png" class="image">
          <div style="padding: 14px;">
            <span>轮播图管理</span>
            <div class="bottom clearfix">
              <div class="album-icon">
                <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                <el-button type="primary" size="mini" icon="el-icon-view"></el-button>
                <el-button type="primary" size="mini" icon="el-icon-delete"></el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>

</template>

<script>
    export default {
      name: "album",
      data() {
        return {
          currentDate: new Date()
        };
      },
      methods:{
        addAlbum(){
          this.$router.push('/addalbum')
        }
      }
    }
</script>

<style scoped>
  .album{
    width: 90%;
    box-sizing: border-box;
    padding: 20px;
    float: right;
    position: relative;
  }
  .el-col-offset-2{
    margin-left: 20px !important;
  }
  .article-btn{
    margin: 20px 0;
    height: 60px;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #f1f1f1;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
