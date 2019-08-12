<template>
    <div class="article-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="article-btn">
        <el-button type="primary" icon="el-icon-plus" plain="" @click="addArticle">添加</el-button>
      </div>
      <div class="article-lsit">
        <el-table
          :data="articleData"
          border
          style="width: 100%;"
          :cell-style="isCenter"
          >
          <el-table-column
            label="id"
            type="index"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            label="分类"
            prop="class"
            align="center">
          </el-table-column>
          <el-table-column
            label="作者"
            prop="author"
            align="center">
          </el-table-column>
          <el-table-column
            label="更新时间"
            prop="edit_time"
            align="center">
          </el-table-column>
          <el-table-column
            label="发布状态"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="checkStatus($event,scope.$index,articleData)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="exitArticle(scope.$index, articleData)"
                type="text"
                size="small">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, articleData)"
                type="text"
                size="small">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <p>显示10条共{{row}}条</p>
        <div class="pages">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" :disabled="isPrev" plain @click="prevPage">上一页</el-button>
          <el-button type="primary" plain :disabled="isBtn" @click="nextPage" ref="prev">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
        </div>
      </div>
      <transition  name="custom-classes-transition"  enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" >
      <router-view></router-view>
      </transition>
    </div>
</template>

<script>
    import {mapGetters} from  'vuex'
    import {exitarticle} from "../../store/getters";
    export default {
        name: "wraplist",
      data() {
        return {
          articleData: [],
          row:0,
          isbth:'false',
          pageIndex:0,
          isBtn:true,
          isPrev:true,
        }
      },
      computed:{
      ...mapGetters([
            'exitarticle'
        ])
      },
      watch:{
        exitarticle(){
          this.articleList();
        }
      },
      mounted(){
        this.articleList();
        this.articleRow();
      },
      created(){
        console.log(1);
      },

      methods: {
        deleteRow(index, rows,) {

          const id=rows[index].id;
          this.$http.post('http://localhost:8082/api/articleApi/deleteArticle',{id:id},{emulateJSON:true}).then((res)=>{
            if(res.body.code==1){
              rows.splice(index, 1);
              this.$message({
                message:res.body.message,
                type: 'success'
              })
            }else{
              this.$message({
                message:res.body.message,
                type: 'warning'
              })
            }
          })

          console.log(rows);
        },
        checkStatus:function($event,index, rows){
            const statusData={id:rows[index].id,status:$event}
            this.$http.post('http://localhost:8082/api/articleApi/exitStatus',statusData,{emulateJSON:true}).then((res)=>{
              if(res.body.code==1){
                this.$message({
                  message:res.body.message,
                  type: 'success'
                })
              }else{
                this.$message({
                  message:res.body.message,
                  type: 'warning'
                })
              }
            })
        },
        //下一页
        nextPage:function(){
          this.pageIndex+=10
          this.$http.post('http://localhost:8082/api/articleApi/articlelist',{pageindex:this.pageIndex},{emulateJSON:true}).then((res)=>{
            if(res.body!=''){
              this.isPrev=false;
              this.articleData=[]
              this.articleData=res.body;
            }else{
              this.$message({
                message:'再点击就废了！已经是最后一页了',
                type:'warning'
              })
              this.isBtn=true;
            }
          })
        },
        prevPage:function(){
          if(this.pageIndex==0){
            this.$message({
              message:'再点击就废了！已经是第一页了',
              type:'warning'
            })
            this.isBtn=false;
            this.isPrev=true;
            return
          }
          this.pageIndex-=10;
          console.log(this.pageIndex)
          this.$http.post('http://localhost:8082/api/articleApi/articlelist',{pageindex:this.pageIndex},{emulateJSON:true}).then((res)=>{
            if(res.body!=''){
              this.articleData=[]
              this.articleData=res.body;
            }else{
            }
          })
        },
        //修改文章
        exitArticle:function(index,rows){
          const id=rows[index].id;
          this.$router.push({name:'addwraplist',params:{id:id}})
          if(window.localStorage){
            localStorage.setItem('articelist',JSON.stringify(rows[index]));
          }else{
            alert("浏览器不支持缓存");
          }
        },
        isCenter:function ({row, column, rowIndex, columnIndex}) {
          return "text-align:center"
        },
        //请求文章数据post
        articleList:function () {
          this.$http.post('http://localhost:8082/api/articleApi/articlelist').then((res)=>{
              console.log(res.body);
              if(res.body !=''){
                this.articleData=res.body
              }
          })
        },
        //文章一共多少条
        articleRow:function(){
          this.$http.get('http://localhost:8082/api/articleApi/articleRow').then((res)=>{
            console.log(res.body);
            if(res.body !=''){
              this.row=res.body[0].count;
              if(this.row>10){
                this.isBtn=false
              }else{
                this.isBtn=true
              }
            }
          })
        },
        //添加文章
        addArticle:function(){
          this.$router.push('/addwraplist')
        },

      },


    }
</script>

<style scoped>
.article-wrap{
  box-sizing: border-box;
  padding: 20px;
  width: 90%;
  float: left;
  text-align: left;
  position: relative;
}
.animated{
  animation-duration: 0.4s;
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
.pages{
  text-align: right;
  margin-top: 20px;
  float: right;
}
.article-lsit p{
  display: inline-block;
  width: 60%;
  text-align: left;
  padding-top: 10px;
  box-sizing: border-box;
}
</style>
