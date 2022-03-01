<!--
 * @Author: your name
 * @Date: 2021-10-14 15:45:20
 * @LastEditTime: 2021-10-22 10:28:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project\server_demo\src\views\Editor\index.vue
-->
<template>
  <div class="editor">
    <div class="editor_head">
      <div class="editor_left">
        <el-popconfirm
          title="确认关闭？如果有内容变更，请先保存。"
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon="el-icon-info"
          icon-color="red"
          @confirm="confirmEvent=>{$router.go(-1)}"
        >
          <template #reference>
            <i class="el-icon-close"></i>
          </template>
        </el-popconfirm>

        <input v-model="title" type="text" placeholder="请输入文章标题" />
      </div>
      <div class="editor_right">
        <el-button type="primary" @click="handEditor">发布</el-button>
        <el-dropdown>
          <i class="el-icon-more"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled v-if="!allIsEdits">查看</el-dropdown-item>
              <el-dropdown-item v-else>查看</el-dropdown-item>
              <el-dropdown-item @click="table=true">设置</el-dropdown-item>
              <el-dropdown-item v-if="!allIsEdits" @click="allEditList.tion='false'">保存草稿</el-dropdown-item>
              <el-dropdown-item v-else @click="pageEditList.statu='草稿'">保存草稿</el-dropdown-item>
              <el-dropdown-item disabled v-if="!allIsEdits">删除</el-dropdown-item>
              <el-dropdown-item v-else>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <v-md-editor
      v-model="text"
      height="400px"
      toc-nav-position-right
      left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save | emoji"
      :disabled-menus="[]"
    ></v-md-editor>

    <!-- 设置栏 -->
    <el-drawer v-model="table" :with-header="false" direction="rtl" size="500px">
      <div class="drawer-head">
        <p v-if="tabEidt">文章设置</p>
        <p v-else-if="!tabEidt">页面属性</p>
        <li class="el-icon-close" @click="table = false"></li>
      </div>
      <div class="drawer-con">
        <p class="drawer_p" v-if="tabEidt">
          <span>文章摘要</span>
          <el-input v-model="text" :rows="4" type="textarea" />
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span>访问密码</span>
          <el-input v-model="allEditList.encrypt" show-password type="password" />
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span>付费查看</span>
          <el-input show-password type="password" />
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span>开启评论</span>
          <el-switch />
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span>首页推荐</span>
          <el-switch />
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span>选择分类</span>
          <el-select v-model="allEditList.classify" placeholder="Select">
            <el-option
              v-for="item in classifys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span>选择标签</span>
          <el-select v-model="allEditList.tag" multiple placeholder="Select">
            <el-option v-for="item in tags" :key="item.id" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span>文章封面:</span>
          <b class="drawer_p_b">
            <img :src="allEditList.img" alt class="img-right" @click="drawered=true" />
            <span>预览图片</span>
          </b>
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span></span>
          <el-input v-model="allEditList.img" placeholder="或输入外部链接" />
        </p>
        <p class="drawer_p" v-if="tabEidt">
          <span></span>
          <el-button>移除</el-button>
        </p>
        <p class="drawer_p" v-else-if="!tabEidt">
          <span>封面</span>
          <el-input placeholder="Please input" class="input-with-select">
            <template #append>
              <el-button
                style="marginRight:0;padding:12px 0;marginLeft:0;"
                icon="el-icon-picture-outline"
              ></el-button>
            </template>
          </el-input>
        </p>
        <p class="drawer_p" v-show="!tabEidt">
          <span>路径</span>
          <el-input type="text" />
        </p>
        <p class="drawer_b" v-show="!tabEidt">
          <span>顺序</span>
          <el-input-number
            v-model="pageEditList.sequence"
            :min="0"
            :max="10"
            controls-position="right"
          />
          <span></span>
          <span></span>
          <span></span>
        </p>
      </div>
      <!-- 设置图片右侧弹框 -->
      <el-drawer v-model="drawered" :with-header="false" modal-class="two_body">
        <div class="drawer-head">
          <p>文件选择</p>
          <li class="el-icon-close" @click="drawered = false"></li>
        </div>
        <div class="two_drawer_body">
          <!-- 输入框 -->
          <el-card class="box-card">
            <el-form :inline="true" class="demo-form-inline search">
              <el-form-item label="账户:">
                <el-input v-model="searchImgList.page" placeholder="请输入账户名"></el-input>
              </el-form-item>
              <el-form-item label="时间:">
                <el-input v-model="searchImgList.date" placeholder="请输入时间"></el-input>
              </el-form-item>
            </el-form>
            <ant-row class="btn">
              <el-button type="primary" @click="imgKnowleSearch">搜索</el-button>
              <el-button>重置</el-button>
            </ant-row>
          </el-card>
          <!-- 上传按钮 -->
          <div class="two_upload">
            <el-upload
              class="upload-demo"
              action="/api/addEditorKnow"
              :onSuccess="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              multiple
            >
              <el-button size="small">上传文件</el-button>
            </el-upload>
          </div>
          <!-- 图片 -->
          <div class="demo-image__placeholder">
            <div class="block" v-for="item in imagesList" :key="item.id">
              <div class="file_all">
                <el-image :src="item.img" :preview-src-list="srcList"></el-image>
                <div class="file_bottom">
                  <p class="demonstra" @click="coverImgs(item.img)">{{item.img}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="demo-pagination-block footer">
            <span>共{{total}}条</span>
            <el-pagination
              :page-sizes="[8, 16,24, 30]"
              :page-size="pageImgSize"
              :total="total"
              layout=" prev ,pager ,next,sizes"
              @size-change="handleSizeChange"
              @current-change="handleChangeIndex"
            ></el-pagination>
          </div>
        </div>
      </el-drawer>
      <div class="drawer_foot">
        <div class="drawer_foot_but">
          <el-button @click="table = false" type="primary">确认</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  addEditor,
  echoEditor,
  changeEditor,
  addPageEditor,
  getClassTag,
  changePageEditor,
} from "../../api/Editor";
import { coverImg } from "../../api/Knowledge";
import { setFile } from "../../api/File";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      table: false,
      allIsEdits: false,
      tabEidt: false,
      title: "",
      text: "",
      classifys: [],
      aaa: [],
      tags: [],
      imagesList: [],
      drawered: false,
      allEditList: {
        classify: "",
        encrypt: "",
        tion: "true",
        classify: "",
        title: "",
        text: "",
        num: 0,
        tag: [],
        love: 0,
        date: "",
        recommend: "",
        img: "",
      },
      pageEditList: {
        name: "",
        url: "456",
        sequence: 0,
        count: 0,
        text: "",
        statu: "已发布",
        date: "",
        toc: "",
      },
      searchImgList: {
        page: "",
        date: "",
      },
      pageImgIndex: 1,
      pageImgSize: 8,
    };
  },
  methods: {
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isJPG && isLt2M;
    },
    async handEditor() {
      if (!this.allIsEdits) {
        if (this.$route.query.name == "All") {
          // 所有文章页面新建
          let date = +new Date();
          let resq = await addEditor("/api/add", {
            allEditList: {
              ...this.allEditList,
              date: new Date(parseInt(date)).toLocaleString(),
              title: this.title,
              text: this.text,
            },
          });
          if (resq.data.code === 200) {
            await ElMessage({
              message: resq.data.message,
              type: "success",
            });
            this.$router.go(-1);
          }
        } else if (this.$route.query.name == "Page") {
          // 管理页面 页面新建
          let date = +new Date();
          let resq = await addPageEditor("/api/addPage", {
            pageEditList: {
              ...this.pageEditList,
              date: new Date(parseInt(date)).toLocaleString(),
              name: this.title,
              text: this.text,
            },
          });
          if (resq.data.code === 200) {
            ElMessage({
              message: resq.data.message,
              type: "success",
            });
          }
          this.$router.go(-1);
        }
      }
      if (this.allIsEdits) {
        if (this.$route.query.edit == "文章编辑") {
          // 所有文章页面编辑
          let resq = await changeEditor("/api/changeEditor", {
            allEditList: {
              ...this.allEditList,
              title: this.title,
              text: this.text,
            },
          });
          if (resq.data.code === 200) {
            ElMessage({
              message: resq.data.message,
              type: "success",
            });
            this.$router.go(-1);
          }
        } else if (this.$route.query.edit == "页面编辑") {
          // 页面管理页面编辑
          let resq = await changePageEditor("/api/changePageEditor", {
            pageEditList: {
              ...this.pageEditList,
              name: this.title,
              text: this.text,
            },
          });
          if (resq.data.code === 200) {
            ElMessage({
              message: resq.data.message,
              type: "success",
            });
          }
          this.$router.go(-1);
        }
      }
    },
    // 文章编辑页面回显
    async setEditor() {
      let resq = await echoEditor("/api/echo", { id: this.$route.query.id });
      if (resq) {
        this.allEditList = resq.data.echoList;
        this.text = resq.data.echoList.text;
        this.title = resq.data.echoList.title;
        this.allEditList.tag = resq.data.echoList.tag.split(",");
      } else {
      }
    },
    // 页面编辑页面回显
    async setPageEditor() {
      let resq = await echoEditor("/api/echoPage", {
        id: this.$route.query.id,
      });
      if (resq) {
        this.pageEditList = resq.data.echoPageList;
        this.text = resq.data.echoPageList.text;
        this.title = resq.data.echoPageList.name;
        this.pageEditList.sequence = resq.data.echoPageList.sequence * 1;
      } else {
      }
    },
    // 获取标签和分类接口
    async getClassTag() {
      let resq = await getClassTag("/api/getClassTag");
      this.classifys = resq.data.classifys;
      this.tags = resq.data.tags;
    },
    // 获取点击上传数据
    async getFile() {
      let resq = await setFile("/api/setImgFile", {
        pageImgIndex: this.pageImgIndex,
        pageImgSize: this.pageImgSize,
      });
      console.log(resq.data);
      this.imagesList = resq.data.results;
      this.srcList = resq.data.results.map((item) => {
        return item.img;
      });
      this.total = resq.data.total;
    },
    // 上传图片 点击覆盖
    async coverImgs(img) {
      let resq = await coverImg("/api/coverImg", { img });
      this.allEditList.img = resq.data.knowleImg;
      if (resq.data.code === 200) {
        this.drawered = false;
      }
    },
  },
  created() {
    if (this.$route.query.name == "All") {
      this.text = "## 新建文章";
      this.getClassTag();
      this.tabEidt = true;
      this.getFile();
    }
    if (this.$route.query.name == "Page") {
      this.text = "## 新建页面";
      this.tabEidt = false;
    }
    if (this.$route.query.allIsEdit) {
      this.allIsEdits = true;
      this.tabEidt = true;
      this.getClassTag();
      this.setEditor();
    }
    this.getFile();
    if (this.$route.query.pageIsEdit) {
      this.text = "## 编辑页面";
      this.allIsEdits = true;
      this.setPageEditor();
    }
  },
};
</script>

<style lang='scss' scope>
.editor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .editor_head {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    .editor_left {
      width: 40%;
      height: 100%;
      display: flex;
      padding-left: 20px;
      align-items: center;
      .el-icon-close {
        font-size: 16px;
        padding: 3px;
        border: 1px solid #ccc;
      }
      input {
        margin-left: 10px;
        width: 200px;
        height: 30px;
        border: none;
        border-bottom: 2px solid #ccc;
        outline: none;
      }
    }
    .editor_right {
      width: 40%;
      justify-content: flex-end;
      padding-right: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      i {
        margin-left: 20px;
      }
    }
  }
}
.el-drawer__body {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .drawer-head {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }
  .drawer-con {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-right: 10px;
  }
  .drawer_p {
    display: flex;
    align-items: center;
    span {
      width: 20%;
    }
    div {
      flex: 1;
    }
    img {
      flex: 1;
      height: 160px;
    }
    .el-button {
      margin-right: 20px;
    }
  }
  .drawer_foot {
    border-top: 1px solid #ccc;
    padding-top: 10px;
    .drawer_foot_but {
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
    }
  }
}
.el-upload__text {
  width: 100%;
  text-align: left;
  padding-left: 10px;
  line-height: 30px;
  border-bottom: 1px solid lavender;
  border-left: 1px solid lavender;
  border-right: 1px solid lavender;
  p {
    font-size: 16px;
    margin: 0;
  }
  span {
    font-size: 14px;
  }
}
.el-icon-folder-add {
  height: 100px;
  line-height: 100px;
  font-size: 60px;
}
.drawer_p_b {
  position: relative;
  background: #ccc;
  flex: 1;
  height: 200px;
  display: flex;
  span {
    text-indent: 1.5em;
    width: 60% !important;
  }
}
.el-cascader__dropdown,
.el-popper,
.is-light,
.is-pure {
  width: 360px;
  right: 30px;
}
.img-right {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px !important;
}
.el-drawer__body .drawer_p span .el-tag,
.el-tag--info,
.el-tag--small,
.el-tag--light > .el-select__tags-text {
  width: auto !important;
}
.drawer_b {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-drawer__body,
  .drawer_p .el-button {
    margin-right: none !important;
  }
}
.el-drawer {
  .drawer-head {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }
  .drawer-con {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-right: 10px;
  }
  .drawer_p {
    display: flex;
    align-items: center;
    span {
      width: 20%;
    }
    div {
      flex: 1;
    }
    img {
      flex: 1;
      height: 160px;
    }
    .el-button {
      margin-right: 20px;
    }
  }
}
.el-drawer__body {
  overflow-y: auto;
}
// 图片区域
.demo-image__placeholder {
  display: flex;
  margin-top: 20px;
  background-color: #fff;
  flex-wrap: wrap;
  .block {
    width: calc(100% / 4);
    flex-shrink: 0;
    flex-direction: column;
  }
  .file_all {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .el-image {
    width: 100%;
    height: 150px;
  }
  .file_bottom {
    flex: 1;
    border: 1px solid #ccc;
    padding: 5px;
    p {
      width: 100%;
      margin: 0;
      height: 100%;
      text-align: left;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      font-size: 16px;
    }
  }
}
.two_body > .el-drawer {
  width: 60% !important;
}
.two_drawer_body {
  width: 100%;
  .el-card {
    border: 0;
    box-shadow: none;
  }
}
.el-upload {
  display: flex;
  justify-content: flex-end;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.demo-pagination-block {
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>