<!--
 * @Author: your name
 * @Date: 2021-10-13 18:50:34
 * @LastEditTime: 2021-10-20 16:56:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\training-group-3\server_demo\src\views\Home\File\file.vue
-->
<template>
  <div class="file_home">
    <!-- 上传文件 -->
    <el-upload
      class="upload-demo"
      drag
      action="/api/setLoad"
      :onSuccess="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      multiple
    >
      <i class="el-icon-folder-add"></i>
      <div class="el-upload__text">
        <p>点击选择文件或将文件拖拽到此处</p>
        <span>文件将上传到 OSS, 如未配置请先配置</span>
      </div>
    </el-upload>
    <!-- 输入框 -->
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="账户:">
          <el-input v-model="fileSearch.img" placeholder="请输入账户名"></el-input>
        </el-form-item>
        <el-form-item label="类型:">
          <el-input v-model="fileSearch.type" placeholder="请输入类型"></el-input>
        </el-form-item>
      </el-form>
      <ant-row class="btn">
        <el-button type="primary" @click="fileSearchs">搜索</el-button>
        <el-button @click="fileSearch.img='',fileSearch.type=''">重置</el-button>
      </ant-row>
    </el-card>
    <!-- 图片 -->
    <div class="demo-image__placeholder">
      <div class="block" v-for="item in srcList" :key="item.id">
        <div class="file_all">
          <el-image class="file_img" :src="item.img" @click="detailsFile(item.id)"></el-image>
          <div class="file_bottom">
            <p class="demonstra">{{item.img}}</p>
            <span class="demonstra">{{item.date}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧弹出框 -->
    <el-drawer v-model="table" :with-header="false" direction="rtl" size="500px">
      <div class="drawer-head">
        <p>文件信息:</p>
        <li class="el-icon-close" @click="table = false"></li>
      </div>
      <div class="drawer_body">
        <img :src="fileImg.img" alt />
        <p>
          文件名称:
          <span>{{fileImg.img}}</span>
        </p>
        <p>
          存储路径:
          <span>{{fileImg.img}}</span>
        </p>
        <p>
          文件类型:
          <span>{{filetype}}</span>
        </p>
        <p>
          访问链接:
          <el-input v-model="fileImg.img" />
        </p>
      </div>
      <div class="drawer_foot">
        <div class="drawer_foot_but">
          <el-button @click="table = false">关闭</el-button>
          <el-popconfirm
            title="确认删除？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-warning"
            icon-color="#FAAD14"
            @confirm="deleteFile"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </el-drawer>
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
import { setFile, fileSearch, detailFiles, deleteFiles } from "../../api/File";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      imageUrl: "",
      srcList: [],
      pageIndex: 1,
      pageSize: 4,
      total: 0,
      table: false,
      fileImg: "",
      filetype: "",
      fileSearch: {
        img: "",
        type: "",
      },
    };
  },

  methods: {
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      await ElMessage({
        message: "成功",
        type: "success",
      });
      this.getFile();
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"||file.type === "image/pneg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isJPG && isLt2M;
    },
    async getFile() {
      let resq = await setFile("/api/setFile", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.srcList = resq.data.results;
      this.total = resq.data.total;
    },
    // 文件管理模糊搜索
    async fileSearchs() {
      let resq = await fileSearch("/api/fileSearch", {
        fileSearch: this.fileSearch,
      });
      this.srcList = resq.data.results.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      this.total=resq.data.results.length
    },
    //文件管理侧边栏
    async detailsFile(id) {
      this.table = true;
      let resq = await detailFiles("/api/detailFiles", { id });
      this.fileImg = resq.data.post;
      this.filetype = resq.data.post.img.slice(-4);
    },
    //文件管理删除
    async deleteFile() {
      let resq = await deleteFiles("/api/deleteFiles", { id: this.fileImg.id });
      if (resq.data.code === 200) {
        await ElMessage({
          message: resq.data.message,
          type: "success",
        });
        this.table = false;
        this.getFile();
      }
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.fileSearchs()
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getFile();
    },
  },
  created() {
    this.getFile();
  },
};
</script>

<style lang='scss' >
.file_home {
  width: 100%;
  height: 100%;
}
.el-upload,
.el-upload--text {
  margin-bottom: 10px;
  width: 100%;
}
.el-icon-folder-add {
  height: 100px;
  line-height: 100px;
  font-size: 60px;
}
.el-upload-dragger {
  width: 100%;
  display: flex;
  flex-direction: column;
  .el-upload__text {
    height: 50px;
    line-height: 0px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    p {
      font-size: 18px;
    }
    span {
      font-size: 14px;
    }
  }
}

.el-main {
  line-height: normal !important;
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
    height: 300px;
    flex-direction: column;
  }
  .file_all {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .el-image {
    width: 100%;
    height: 70%;
  }
  .file_bottom {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid #ccc;
    padding: 5px;
    p {
      width: 100%;
      margin: 0;
      text-align: left;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      font-size: 16px;
    }
    span {
      width: 100%;
      margin: 0;
      text-align: left;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      font-size: 14px;
    }
  }
}
.search {
  display: flex;
  .el-form--inline .el-form-item {
    margin: 0px;
  }
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.table_card {
  margin: 20px 0;
}
.demo-pagination-block {
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.drawer-head {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.drawer_body {
  img {
    width: 100%;
    height: 300px;
  }
  p {
    padding-top: 10px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    input {
      width: 400px;
    }
  }
}
.drawer_foot {
  position: absolute;
  bottom: 10px;
  width: 100%;
  right: 0;
  border-top: 1px solid #ccc;
  padding: 10px;
  .drawer_foot_but {
    display: flex;
    padding-right: 10px;
    justify-content: flex-end;
  }
}
</style>