<template>
    <div class="article-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="article-btn">
        <el-button type="primary" icon="el-icon-plus" plain="">添加</el-button>
        <el-button type="primary" icon="el-icon-delete" plain="">删除</el-button>
      </div>
      <div class="article-lsit">
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
          :cell-style="isCenter"
          >
          <el-table-column
            label="id"
            prop="id"
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
            prop="classtype"
            align="center">
          </el-table-column>
          <el-table-column
            label="来源"
            prop="source"
            align="center">
          </el-table-column>
          <el-table-column
            label="更新时间"
            prop="date"
            align="center">
          </el-table-column>
          <el-table-column
            label="发布状态"
            prop="status"
            align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <p>显示10条共20条</p>
        <div class="pages">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" plain>上一页</el-button>
          <el-button type="primary" plain>下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "wraplist",
      methods: {
        deleteRow(index, rows) {
          rows.splice(index, 1);
        },
        isCenter:function ({row, column, rowIndex, columnIndex}) {
          return "text-align:center"
        }

      },
      data() {
        return {
          tableData: [{
            id:'0',
            title:'随风奔跑自由是方向',
            classtype:'web前端',
            source:'灵猫电商',
            date: '2016-05-03',
            status:0,
            zip: 200333
          },
            {
              id:'1',
              title:'随风奔跑自由是方向',
              classtype:'web前端',
              source:'灵猫电商',
              date: '2016-05-03',
              status:0,
              zip: 200333
            }
          ]
        }
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
