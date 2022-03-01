<!--
 * @Author: your name
 * @Date: 2021-10-13 16:38:57
 * @LastEditTime: 2021-10-18 16:01:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\training-group-3\server_demo\src\views\Home\Workbench\workbench.vue
-->
<template>
  <div class="workBench">
    <!-- Echart -->
    <div class="work_echart">
      <h3>面板导航</h3>
      <Echarts />
    </div>
    <!-- 快速文章 -->
    <div class="work_quick">
      <h3>快速导航</h3>
      <div class="quick_fast">
        <p
          v-for="item in quickList"
          :key="item.router"
          @click="this.$router.push(item.router)"
        >{{item.name}}</p>
      </div>
    </div>
    <!-- 最新文章 -->
    <div class="new">
      <p class="new-top">
        <span>最新文章</span>
        <el-link type="primary" @click="$router.push('/layout/articles/all')">全部文章</el-link>
      </p>
      <div class="new-item">
        <el-row :gutter="12">
          <el-col :span="8" v-for="v in newArticles" :key="v.id">
            <el-card
              shadow="hover"
              @click="$router.push({
                path:`/editor`,
                query:{
                  id:v.id,
                  allIsEdit:true,
                  edit:'文章编辑'
                  }
              })"
            >
              <dl>
                <dt>
                  <img alt />
                </dt>
                <dd>
                  <span>文章封面</span>
                  <span>{{ v.title}}</span>
                </dd>
              </dl>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 评论内容 -->
    <el-card class="Comment_all">
      <p class="discuss-title">
        <span>最新评论</span>
        <span @click="$router.push('/layout/comment')">全部评论</span>
      </p>
      <div class="work-content">
        <div class="content-item" v-for="v in tableData" :key="v.id">
          <div class="item-left">
            <span>{{ v.name }}</span>
            <span>在</span>
            <span style="color:#1890ff;">文章</span>
            <span>评论</span>
            <span style="color:#1890ff;">
              <el-popover
                placement="top-start"
                title="评论详情—原始内容"
                :width="200"
                trigger="hover"
                :content="v.preContent"
              >
                <template #reference>
                  <a href>查看内容</a>
                </template>
              </el-popover>
            </span>
            <span class="okTion" v-if="v.statu === 'true'">通过</span>
            <span class="noTion" v-else>未通过</span>
          </div>
          <div class="item-right">
            <span style="color:#1890ff;" @click="alterStatu('true',v.id)">通过</span>
            <span style="color:#eee;">|</span>
            <span style="color:#1890ff;" @click="alterStatu('false',v.id)">拒绝</span>
            <span style="color:#eee;">|</span>
            <span style="color:#1890ff;">
              <el-button type="text" @click="dialogVisible = true">回复</el-button>
            </span>
            <span style="color:#eee;">|</span>
            <span style="color:#1890ff;">
              <el-popconfirm
                title="确认删除？"
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="el-icon-warning"
                icon-color="#FAAD14"
                @confirm="deleteComments(v.id)"
              >
                <template #reference>
                  <el-button type="text">删除</el-button>
                </template>
              </el-popconfirm>
            </span>
          </div>
        </div>
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
      </div>
    </el-card>
  </div>
</template>
<script>
import { getAllArticles } from "../../api/Workbench";
import { ElMessage } from "element-plus";
import {
  getComment,
  typeComment,
  deleteComment,
  addComment,
} from "../../api/Comment";
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
      list: [],
      quickList: [
        {
          router: "/layout/articles/all",
          name: "文章管理",
        },
        {
          router: "/layout/comment",
          name: "评论管理",
        },
        {
          router: "/layout/file",
          name: "文件管理",
        },
        {
          router: "/layout/user",
          name: "用户管理",
        },
        {
          router: "/layout/email",
          name: "邮件管理",
        },
        {
          router: "/layout/visit",
          name: "访问管理",
        },
        {
          router: "/layout/system",
          name: "系统设置",
        },
      ],
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
      //最新文章数据
      newArticles: [],
      tableData: [],
    };
  },
  methods: {
    // 所有文章数据
    async AllArticles() {
      const res = await getAllArticles("/api/workAll", {
        pageIndex: 1,
        pageSize: 6,
      });
      this.newArticles = res.data.allList;
    },
    //  评论内容 数据
    async getComments() {
      let resq = await getComment("/api/getComment", {
        pageIndex: 1,
        pageSize: 6,
      });
      this.tableData = resq.data.commentList;
    },
    // 评论内容修改数据状态
    async alterStatu(type, id) {
      let resq = await typeComment("/api/typeComment", { type, id });
      this.getComments();
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
        this.getComments();
      }
    },
    // 评论内容数据删除
    async deleteComments(id) {
      let resq = await deleteComment("/api/deleteComment", { id });
      this.getComments();
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
        this.getComments();
      }
    },
    // 评论管理页面回复功能
    async addComments() {
      this.dialogVisible = false;
      let resq = await addComment("/api/addComment", {
        addCommentList: this.addCommentList,
      });
      this.addCommentList.preContent = "";
      this.getComments();
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
        this.getComments();
      }
    },
  },
  created() {
    //请求最新文章数据
    this.AllArticles();
    //请求评论内容数据
    this.getComments();
  },
};
</script>

<style lang="scss" scoped>
.workBench {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .work_echart {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-top: 20px;
    h3 {
      width: 100%;
      padding-left: 20px;
      display: flex;
      line-height: 50px;
      font-size: 16px;
      height: 50px;
      justify-content: flex-start;
      border-bottom: 1px solid #eee;
    }
  }
  .work_quick {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-top: 20px;
    .quick_fast {
      width: 100%;
      padding: 20px 0;
      display: flex;
      border-top: 1px solid #eee;
      align-items: center;
      justify-content: space-around;
    }
    h3 {
      width: 100%;
      padding-left: 20px;
      display: flex;
      line-height: 50px;
      font-size: 16px;
      height: 50px;
      justify-content: flex-start;
    }
  }
  .newest {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    border-top: 1px solid #eee;
  }
  .newest dl {
    width: 330px;
    height: 200px;
    display: flex;
    border: 1px solid #eee;
    margin-left: 50px;
  }
  .newest dl dt {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .newest dl dd {
    padding: 20px;
  }
  .newest-title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .commment {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    border-top: 1px solid #eee;
  }
  .comment-title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.el-col,
.el-col-8,
.is-guttered {
  margin-bottom: 10px;
}
.new {
  background: #fff;
  margin-top: 20px;
  padding: 10px 20px;
  .new-top {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .new-item {
    .el-col {
      height: 200px;
      .el-card {
        height: 200px;
        .el-card__body {
          height: 100%;
          dl {
            width: 100%;
            height: 100%;
            display: flex;
            dt {
              width: 50px;
              height: 50px;
              img {
                width: 50px;
                height: 50px;
              }
            }
            dd {
              flex: 200px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
.Comment_all {
  margin-top: 20px;
}
.el-card__body {
  display: flex;
  flex-direction: column;
  .discuss-title {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    margin-bottom: 50px;
  }
}
.work-content {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  .content-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    height: 40px;
    border-bottom: 1px solid #ccc;
    span {
      margin: 0 5px;
    }
  }
  .content-item:last-child {
    border-bottom: none;
  }
}
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
</style>
