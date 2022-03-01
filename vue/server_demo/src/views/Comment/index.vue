<!--
 * @Author: your name
 * @Date: 2021-10-14 14:42:08
 * @LastEditTime: 2021-10-20 19:29:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\views\Home\messageAdmin\index.vue
-->
<template>
  <div class="messageAdmin">
    <!-- 输入框 -->
    <el-card class="box-card" style="margin-bottom: 20px;">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="称呼:">
          <el-input v-model="searchCommentList.username" placeholder="请输入称呼:"></el-input>
        </el-form-item>
        <el-form-item label="email:">
          <el-input v-model="searchCommentList.email" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchCommentList.statu" placeholder="请选择状态">
            <el-option label="已通过" value="true"></el-option>
            <el-option label="未通过" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn" style="display:flex;justify-content: flex-end;">
        <el-button type="primary" @click="searchComment">搜索</el-button>
        <el-button
          @click="searchCommentList.username='',searchCommentList.email='',searchCommentList.statu=''"
        >重置</el-button>
      </div>
    </el-card>
    <!-- 批量操作和刷新 -->
    <div class="batch_all">
      <div class="all_but" v-show="multipleSelection.length">
        <el-button @click="commentOff('true')">通过</el-button>
        <el-button @click="commentOff('false')">拒绝</el-button>
        <el-popconfirm
          title="确认删除？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon="el-icon-warning"
          icon-color="#FAAD14"
          @confirm="allDeleteComment"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="all_new">
        <i class="el-icon-refresh-right" @click="this.getComments()"></i>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column fixed label="状态" width="150">
        <template #default="scope">
          <span class="noTion" v-if="scope.row.statu==='false'">未通过</span>
          <span class="okTion" v-else-if="scope.row.statu==='true'">通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="称呼" width="120" />
      <el-table-column prop="relation" label="联系方式" width="150" />
      <el-table-column label="原始内容" width="120">
        <template #default="scope">
          <el-popover
            placement="top-start"
            title="评论详情—原始内容"
            :width="200"
            trigger="hover"
            :content="scope.row.preContent"
          >
            <template #reference>
              <a href>查看内容</a>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="HTML内容" width="120">
        <template #default="scope">
          <el-popover
            placement="top-start"
            title="评论详情—HTML内容"
            :width="200"
            trigger="hover"
            :content="scope.row.htmlContent"
          >
            <template #reference>
              <a href>查看内容</a>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="管理文章" width="120">
        <template #default="scope">
          <span :id="scope.row.id">文章</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="创建时间" width="120" />
      <el-table-column prop="parentMessage" label="父级评论" width="120" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <span
            style="color:#1890ff;	margin-right: 5px;"
            @click="alterStatu('true',scope.row.id)"
          >通过</span>
          <span :id="scope.row.id" style="color:#eee;	margin-right: 5px;">|</span>
          <span
            style="color:#1890ff;	margin-right: 5px;"
            @click="alterStatu('false',scope.row.id)"
          >拒绝</span>
          <span style="color:#eee;	margin-right: 5px;">|</span>
          <span style="color:#1890ff;	margin-right: 5px;">
            <el-button type="text" @click="dialogVisible = true">回复</el-button>
            <el-dialog v-model="dialogVisible" title="回复评论" width="30%" :before-close="handleClose">
              <textarea
                class="comment_inp"
                name
                id
                cols="30"
                rows="10"
                v-model="addCommentList.preContent"
              ></textarea>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="addComments()">回复</el-button>
                </span>
              </template>
            </el-dialog>
          </span>
          <span style="color:#eee;	margin-right: 5px;">|</span>
          <span style="color:#1890ff;	margin-right: 5px;">
            <el-popconfirm
              title="确认删除？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-warning"
              icon-color="#FAAD14"
              @confirm="deleteComments(scope.row.id)"
            >
              <template #reference>
                <el-button type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="demo-pagination-block footer">
      <span>共{{total}}条</span>
      <el-pagination
        :page-sizes="[4, 8, 10, 20]"
        :page-size="pageSize"
        :total="total"
        layout=" prev ,pager ,next,sizes"
        @size-change="handleSizeChange"
        @current-change="handleChangeIndex"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getComment,
  typeComment,
  deleteComment,
  allDeleteComment,
  allOffComment,
  addComment,
  searchComment,
} from "../../api/Comment";
import { ElMessage } from "element-plus";
import { ref } from "vue";
export default {
  setup() {
    const dialogVisible = ref(false);
    const handleClose = (done) => {
      done();
    };
    return {
      dialogVisible,
      handleClose,
    };
  },
  data() {
    return {
      searchCommentList: {
        username: "",
        email: "",
        statu: "",
      },
      tableData: [],
      multipleSelection: [],
      addCommentList: {
        statu: "false",
        name: this.$store.state.user.name,
        relation: "157@qq.com",
        preContent: "",
        htmlContent: "",
        article: 1,
        date: "",
        parentMessage: "测试",
      },
      pageIndex: 1,
      pageSize: 4,
      total: 0,
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 评论管理数据
    async getComments() {
      let resq = await getComment("/api/getComment", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.tableData = resq.data.commentList;
      this.total = resq.data.total;
    },
    // 评论管理修改数据状态
    async alterStatu(type, id) {
      let resq = await typeComment("/api/typeComment", { type, id });
      this.pop(resq.data.code, resq.data.message);
    },
    // 评论管理数据删除
    async deleteComments(id) {
      let resq = await deleteComment("/api/deleteComment", { id });
      this.pop(resq.data.code, resq.data.message);
    },
    // 批量删除评论管理页面数据
    async allDeleteComment() {
      let resq = await allDeleteComment("/api/allDeleteComment", {
        commentList: this.multipleSelection,
      });
      this.pop(resq.data.code, resq.data.message);
    },
    // 批量修改评论管理页面状态
    async commentOff(type) {
      let resq = await allOffComment("/api/commentOff", {
        commentList: this.multipleSelection,
        type,
      });
      this.pop(resq.data.code, resq.data.message);
    },
    // 评论管理页面回复功能
    async addComments() {
      this.dialogVisible = false;
      let resq = await addComment("/api/addComment", {
        addCommentList: this.addCommentList,
      });
      this.addCommentList.preContent = "";
      this.pop(resq.data.code, resq.data.message);
    },
    // 评论管理页面搜索
    async searchComment() {
      let resq = await searchComment("/api/searchComment", {
        searchCommentList: this.searchCommentList,
      });
      if (resq === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
      this.tableData = resq.data.result;
    },
    // 评论管理页面重置
    visitReset() {
      this.searchCommentList.username = "";
      this.searchCommentList.email = "";
      this.searchCommentList.statu = "";
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.getComments();
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getComments();
    },
    pop(resq, messages) {
      if (resq === 200) {
        ElMessage({
          message: messages,
          type: "success",
        });
        this.getComments();
      } else {
        ElMessage({
          message: messages,
          type: "error",
        });
      }
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style lang='scss'>
.okTion::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: green;
  margin-right: 8px;
}
.noTion::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #faad14;
  margin-right: 8px;
}
.batch_all {
  width: 100%;
  height: 60px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  position: relative;
  line-height: 60px;
  justify-content: center;
  .all_but {
    display: flex;
    flex: 1;
    padding-left: 10px;
    .el-button {
      height: 35px;
      margin-top: 10px;
    }
  }
  .all_new {
    line-height: 60px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    .el-button {
      margin-right: 20px;
    }
  }
}
.el-overlay {
  background-color: rgba(0, 0, 0, 0.1);
}
.comment_inp {
  width: 100%;
  height: 120px;
  input {
    width: 100%;
    height: 100%;
    text-align: left;
  }
}
.el-form {
  display: flex;
}
.demo-pagination-block {
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>