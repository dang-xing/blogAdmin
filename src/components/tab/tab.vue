<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router=""
        >
          <el-menu-item index="/wraplist" >
            <i class="el-icon-menu"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="/album">
            <i class="el-icon-document"></i>
            <span slot="title">相册管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    name:'tab',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
.tac{
  width: 10%;
  float: left;
}
.el-menu{
  height: 100vh;
  width: 100%;
}
.el-col-12{
  width: 100%;
}
</style>
