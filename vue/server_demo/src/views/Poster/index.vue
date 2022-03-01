<!--
 * @Author: your name
 * @Date: 2021-10-13 18:50:34
 * @LastEditTime: 2021-10-26 19:10:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\training-group-3\server_demo\src\views\Home\File\file.vue
-->
<template>
  <div class="poster_home">
    <el-upload
      class="upload-demo"
      drag
      action="/api/setPosterLoad"
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
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="文件:">
          <el-input placeholder="文件名称"></el-input>
        </el-form-item>
      </el-form>
      <ant-row class="btn">
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </ant-row>
    </el-card>
    <!-- 图片 -->
    <div class="demo-image__placeholder">
      <div class="block" v-for="item in srcList" :key="item.id">
        <div class="poster_all">
          <el-image class="file_img" :src="item.img"></el-image>
          <div class="poster_bottom">
            <p class="demonstra">{{ item.img }}</p>
            <span class="demonstra">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="demo-pagination-block footer">
      <span>共{{ total }}条</span>
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
import { setPosters } from "../../api/Poster";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      imageUrl: "",
      total: 0,
      srcList: [],
      pageIndex: 1,
      pageSize: 4,
    };
  },

  methods: {
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.getPoster();
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg"||file.type === "image/pneg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isJPG && isLt2M;
    },
    async getPoster() {
      let resq = await setPosters("/api/setPosters", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.srcList = resq.data.results;
      console.log(resq.data.results);
      this.total = resq.data.total;
    },
  },
  created() {
    this.getPoster();
  },
};
</script>
  
  <style lang='scss'>
.poster_home {
  width: 100%;
  height: 100%;
}
.el-upload,
.el-upload--text {
  margin-bottom: 10px;
  width: 100%;
}
.el-icon-folder-add {
  // width: 70px;
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
  min-height: 200px;
  margin-top: 20px;
  background-color: #fff;
  flex-wrap: wrap;
  .block {
    width: calc(100% / 4);
    flex-shrink: 0;
    height: 300px;
    line-height: none;
    flex-direction: column;
  }
  .poster_all {
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
  .poster_bottom {
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
</style>