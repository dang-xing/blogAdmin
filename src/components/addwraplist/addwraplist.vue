<template>
  <div class="add-article" :style="boxHight">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="文章标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="文章作者">
    <el-input v-model="form.author"></el-input>
  </el-form-item>
  <el-form-item label="关键词">
    <el-input v-model="form.keywords"></el-input>
  </el-form-item>
  <el-form-item label="分类栏目">
    <el-select v-model="form.class" placeholder="请选择栏目">
      <el-option label="javascript" value="javascript"></el-option>
      <el-option label="php" value="php"></el-option>
      <el-option label="php" value="node.js"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="文章摘要">
    <el-input type="textarea" v-model="form.brief"></el-input>
  </el-form-item>
  <el-form-item label="是否发布">
      <el-switch
        v-model="form.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-value="1"
        :inactive-value="0"
        @change="cheackStatus($event)"
      >
      </el-switch>

  </el-form-item>
  <el-form-item label="文章来源">
    <el-radio-group v-model="form.source">
      <el-radio label="转载" ></el-radio>
      <el-radio label="原创" ></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="缩略图">
    <el-upload
      action="http://localhost:8082/api/articleApi/file/uploading"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="upDataimg"
      :limit="1"
      :on-exceed="maxImg"
      :file-list="fileList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-form-item>
  <el-form-item label="文章摘要">
    <div>
    <quill-editor ref="myTextEditor"
                  v-model="details"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
    </div>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        form: {
          title: '',
          author: '',
          keywords: '',
          class: '',
          brief: '',
          status: false,
          source: '转载',
        },
        dialogImageUrl: '',
        dialogVisible: false,
        details:'',
        img_url:'',
        fileList:[{
          url:'',
        }]
      }
    },
    computed:{
      boxHight(){
        return `height:${document.documentElement.clientHeight-60}px`
      },
    },
    mounted(){
      this.exitArticle();
    },
    beforeRouteLeave(to, from, next){
      localStorage.removeItem('articelist');
      next()
    },
    methods: {
      onSubmit() {
        this.$set(this.form,'img_url',this.img_url);
        this.$set(this.form,'details',this.details);
        this.setArticle(this.form);
        this.$http.post('http://localhost:8082/api/articleApi/addArticle',this.form,{emulateJSON:true}).then((res)=>{
            if(res.body.code==1){
              var _sef=this
              this.$message({
                message:res.body.title,
                type: 'success',
                onClose:function(){
                  _sef.$router.push('/wraplist')
                }
              })
            }else{
              this.open(res.body.title)
            }
        })
      },
      ...mapMutations({
        setArticle:'SET_EXITARTICLE'
      }),
      cheackStatus($event){
          this.form.status=$event;
      },
      exitArticle:function(){
        let articleData=JSON.parse(localStorage.getItem('articelist'))
        if(articleData==null){
          return
        }else{
          this.form=articleData;
          if(this.form.source==1){
            this.form.source="原创"
          }else{
            this.form.source="转载"
          }
          this.fileList[0].url=`http://${this.form.img_url}`
          this.details=this.form.details;
          this.img_url=this.form.img_url;
        }
      },
      cancel(){
        this.$router.push('/wraplist')
      },
      handleRemove(file, fileList) {
      //  console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      upDataimg(response, file, fileList){
          var imgurl=response.slice(7)
          this.img_url="localhost:8082/"+imgurl;
      },
      onEditorBlur(){
      },
      onEditorFocus(){
      },
      onEditorReady(){
      },
      maxImg(){
        this.open('缩略图只能上传一张！！')
      },
      open(info) {
        this.$message({
          message:info,
          type: 'warning'
        })

      },

    },
    components: {
      quillEditor
    }
  }
</script>

<style scoped>
.add-article{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 2;
  padding: 20px 30px;
  box-sizing: border-box;
  overflow-y: scroll;
}

</style>
