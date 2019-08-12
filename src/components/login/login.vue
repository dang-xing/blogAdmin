<template>
    <div class="login-box">
      <div class="login-wrap"  ref="wrap">
        <h2>CARL-ADMIN</h2>
        <div class="login-from">
        <el-form ref="form" :model="form">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即登录</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
      data() {
        return {
          form: {
            name: '',
            password: '',
          }
        }
      },
      computed:{

      },
      mounted(){
        this.styleHeight();
      },
      methods: {
        onSubmit() {
          this.$http.post('http://localhost:8082/api/loginApi/login',this.form,{emulateJSON:true}).then((res)=>{

            if(res.body!=''){

              if(res.body.code==1){
                console.log(res);
                let _sef=this;
                this.$message({
                  message:res.body.message,
                  type: 'success',
                  onClose:function () {

                    _sef.$router.push('/wraplist')
                  }
                })
                document.cookie="username="+this.form.name+'carl'
              }else{
                this.$message({
                  message:res.body.message,
                  type:'warning'
                })
              }
            }
          })
        },
        styleHeight(){
          this.$refs.wrap.style.marginTop= `${(document.documentElement.clientHeight-400)/2}px`
          this.$refs.wrap.style.marginLeft=`${(document.documentElement.clientWidth-400)/2}px`
        }
      }
    }
</script>

<style scoped>
.login-box{
  width: 100vw;
  height: 100vh;
  background-color: #000;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}
.login-wrap{
  width: 400px;
  height: 400px;
  background-color: #fff;
  text-align: center !important;
}
.login-from{
  box-sizing: border-box;
  padding: 20px;
}
.login-wrap h2{
  height: 60px;
  width: 100%;
  color: #fff;
  font-weight: normal;
  text-align: center;
  line-height: 60px;
  background-color: #F56C6C;
}
.login-box{
  background: url("../../assets/login_bg.jpg") center no-repeat;
  background-size: cover;
}
</style>
