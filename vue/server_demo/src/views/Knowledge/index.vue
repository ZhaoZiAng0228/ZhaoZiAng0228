<template>
  <div class="knowledge">
    <!-- 输入框 -->
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="账户:">
          <el-input
            v-model="searchKnowle.page"
            placeholder="请输入账户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchKnowle.status" placeholder="请选择状态">
            <el-option label="已发布" value="true"></el-option>
            <el-option label="草稿" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <ant-row class="btn">
        <el-button type="primary" @click="knowleSearch">搜索</el-button>
        <el-button @click="(searchKnowle.page = ''), (searchKnowle.status = '')"
          >重置</el-button
        >
      </ant-row>
    </el-card>
    <!-- 新建 -->
    <div class="batch_all">
      <div class="all_new">
        <el-button type="primary" icon="el-icon-plus" @click="addknowle"
          >新建</el-button
        >
      </div>
    </div>
    <!-- 图片 -->
    <div class="knowledge_img">
      <div class="block" v-for="item in knowImg" :key="item.id">
        <el-image :src="item.img">
          <template #placeholder>
            <div class="image-slot">
              Loading
              <span class="dot">...</span>
            </div>
          </template>
        </el-image>
        <div class="el-upload__text">
          <p>{{ item.page }}</p>
          <span>{{ item.word }}</span>
        </div>
        <div class="tyy">
          <p class="tyy_p">
            <i class="el-icon-edit"></i>
          </p>
          <p class="tyy_p">
            <el-tooltip
              class="item"
              effect="dark"
              v-if="item.status == 'false'"
              content="发布线上"
              placement="top-start"
            >
              <i
                class="el-icon-lightning"
                @click="setKnowStatus('true', item.id)"
              ></i>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              v-else-if="item.status == 'true'"
              content="设为草稿"
              placement="top-start"
            >
              <i
                class="el-icon-cloudy"
                @click="setKnowStatus('false', item.id)"
              ></i>
            </el-tooltip>
          </p>
          <p class="tyy_p">
            <i class="el-icon-setting" @click="setKnowle(item.id)"></i>
          </p>
          <!-- 删除确认框 -->
          <p class="tyy_p">
            <el-popconfirm
              title="确认删除？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-warning"
              icon-color="#FAAD14"
              @confirm="knowDelete(item)"
            >
              <template #reference>
                <i class="el-icon-coffee"></i>
              </template>
            </el-popconfirm>
          </p>
        </div>
      </div>
      <!-- 右侧弹出框 -->
      <el-drawer
        v-model="table"
        :with-header="false"
        direction="rtl"
        size="50%"
      >
        <div class="drawer-head">
          <p v-if="!redactEdit">更新知识库</p>
          <p v-if="redactEdit">新建知识库</p>
          <li class="el-icon-close" @click="table = false"></li>
        </div>
        <div class="drawer-con">
          <p class="drawer_p">
            <span>名字:</span>
            <el-input v-model="setKnowleList.page" />
          </p>
          <p class="drawer_p">
            <span>描述：</span>
            <el-input :rows="2" type="textarea" v-model="setKnowleList.word" />
          </p>
          <p class="drawer_p">
            <span>评论：</span>
            <el-switch />
          </p>
        </div>
        <p class="drawer_p">
          <span>封面:</span>
          <el-upload
            class="upload-demo"
            drag
            action="/api/addFileKnow"
            :onSuccess="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            multiple
          >
            <i class="el-icon-folder-add"></i>
            <div class="el-upload__text">
              <p>点击选择文件或将文件拖拽到此处</p>
              <span>文件将上传到 OSS, 如未配置请先配置</span>
            </div>
            <img
              :src="setKnowleList.img"
              alt
              class="img-right"
              v-if="setKnowleList.img"
            />
          </el-upload>
        </p>
        <p class="drawer_p">
          <span></span>
          <el-input v-model="setKnowleList.img" />
        </p>
        <p class="drawer_p">
          <el-button @click="drawered = true">点击上传</el-button>
          <el-button
            type="danger"
            @click="setKnowleList.img = ''"
            v-if="setKnowleList.img"
            >移除</el-button
          >
        </p>
        <div class="drawer_foot">
          <div class="drawer_foot_but">
            <el-button @click="table = false">取消</el-button>
            <el-button type="primary" @click="reactKnows" v-if="!redactEdit"
              >更新</el-button
            >
            <el-button type="primary" @click="reactKnows" v-if="redactEdit"
              >创建</el-button
            >
          </div>
        </div>
      </el-drawer>
    </div>
    <!-- 点击上传右侧弹出框 -->
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
              <el-input
                v-model="searchImgList.page"
                placeholder="请输入账户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="时间:">
              <el-input
                v-model="searchImgList.date"
                placeholder="请输入时间"
              ></el-input>
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
            action="/api/addFileKnow"
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
                <p class="demonstra" @click="coverImgs(item.img)">
                  {{ item.img }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="demo-pagination-block footer">
          <span>共{{ total }}条</span>
          <el-pagination
            :page-sizes="[8, 16, 24, 30]"
            :page-size="pageImgSize"
            :total="total"
            layout=" prev ,pager ,next,sizes"
            @size-change="handleSizeChange"
            @current-change="handleChangeIndex"
          ></el-pagination>
        </div>
      </div>
    </el-drawer>
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
import {
  setKnow,
  setKnowList,
  redactKnow,
  addKnowle,
  setKnowleStatu,
  deleteKnow,
  searchKnowle,
  coverImg,
} from "../../api/Knowledge";
import { setFile } from "../../api/File";
import { ElMessage } from "element-plus";
import { ref } from "vue";
export default {
  data() {
    return {
      table: false,
      drawered: false,
      knowImg: [],
      imageUrl: "",
      imagesList: [],
      setKnowleList: {
        img: "",
        page: "",
        word: "",
        status: "false",
      },
      searchKnowle: {
        page: "",
        status: "",
      },
      searchImgList: {
        page: "",
        date: "",
      },
      pageIndex: 1,
      pageSize: 4,
      total: 0,
      pageImgIndex: 1,
      pageImgSize: 8,
      redactEdit: false,
    };
  },
  setup() {
    const srcList = ref([]);
    return {
      srcList,
    };
  },
  methods: {
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/pneg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isJPG && isLt2M;
    },
    // 知识小册获取数据
    async getKnowleDge() {
      let resq = await setKnow("/api/setKnow", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.knowImg = resq.data.results;
      this.total = resq.data.total;
    },
    // 知识小册回显数据
    async setKnowle(id) {
      this.table = true;
      let resq = await setKnowList("/api/setKnowList", { id });
      this.setKnowleList = resq.data.post;
    },
    // 知识小册编辑数据
    async reactKnows() {
      let resq = null;
      if (!this.redactEdit) {
        resq = await redactKnow("/api/redactKnow", {
          setKnowleList: this.setKnowleList,
        });
      } else {
        resq = await addKnowle("/api/addKnowle", {
          setKnowleList: this.setKnowleList,
        });
      }
      if (resq.data.code === 200) {
        await ElMessage({
          message: resq.data.message,
          type: "success",
        });
        this.table = false;
        this.getKnowleDge();
      }
    },
    //知识小册新建数据
    async addknowle() {
      this.redactEdit = true;
      this.table = true;
      this.setKnowleList.img = "";
      this.setKnowleList.page = "";
      this.setKnowleList.word = "";
    },
    // 知识小册数据改变状态
    async setKnowStatus(status, id) {
      let resq = await setKnowleStatu("/api/setKnowleStatu", { status, id });
      if (resq.data.code === 200) {
        await ElMessage({
          message: resq.data.message,
          type: "success",
        });
        this.getKnowleDge();
      }
    },
    // 知识小册删除数据
    async knowDelete(item) {
      let resq = await deleteKnow("/api/deleteKnow", { item });
      if (resq.data.code === 200) {
        await ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
      this.getKnowleDge();
    },
    // 知识小册模糊搜索
    async knowleSearch() {
      let resq = await searchKnowle("/api/searchKnowle", {
        searchKnowle: this.searchKnowle,
      });
      this.knowImg = resq.data.result;
    },
    // 获取点击上传数据
    async getFile() {
      let resq = await setFile("/api/setImgFile", {
        pageImgIndex: this.pageImgIndex,
        pageImgSize: this.pageImgSize,
      });
      this.imagesList = resq.data.results;
      this.srcList = resq.data.results.map((item) => {
        return item.img;
      });
      this.total = resq.data.total;
    },
    // 上传图片 点击覆盖
    async coverImgs(img) {
      let resq = await coverImg("/api/coverImg", { img });
      this.setKnowleList.img = resq.data.knowleImg;
      if (resq.data.code === 200) {
        this.drawered = false;
      }
    },
    // 上传数据模糊搜索
    async imgKnowleSearch() {
      let resq = await searchKnowle("/api/searchImgKnowle", {
        searchImgList: this.searchImgList,
      });
      this.imagesList = resq.data.result;
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.getKnowleDge();
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getKnowleDge();
    },
  },
  created() {
    this.getKnowleDge();
    this.getFile();
  },
};
</script>
<style lang="scss">
.knowledge {
  width: 100%;
  height: 100%;
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
.el-image {
  width: 100%;
  height: 52%;
}
.el-main {
  line-height: normal !important;
}
.knowledge_img {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: white;
  flex-wrap: wrap;
  text-align: center;
  flex-shrink: 0px;
  padding: 10px;
}
.knowledge_img .block {
  width: 24%;
  height: 200px;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
}
.tyy {
  border-bottom: 1px solid lavender;
  border-left: 1px solid lavender;
  border-right: 1px solid lavender;
  display: flex;
  .tyy_p {
    width: calc(100% / 4);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 1px solid lavender;
  }
}
.tyy:last-child {
  border-right: none;
}
.tyy i {
  font-size: 18px;
}
.search {
  display: flex;
  .el-form--inline .el-form-item {
    margin: 0;
  }
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.table_card {
  margin: 20px 0;
}
.el-overlay {
  background-color: rgba(0, 0, 0, 0.1);
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
.two-drawer {
  width: 5000px !important;
}
.demo-pagination-block {
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.img-right {
  position: absolute;
  top: 0;
  left: 0;
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
  position: relative;
  height: auto;
  .el-upload__text {
    border: none;
  }
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
  .all_new {
    line-height: 60px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.drawer_foot {
  position: absolute;
  bottom: 10px;
  width: 100%;
  right: 0;
  .drawer_foot_but {
    display: flex;
    padding-right: 10px;
    justify-content: flex-end;
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
</style>