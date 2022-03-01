<!--
 * @Author: your name
 * @Date: 2021-10-19 10:51:12
 * @LastEditTime: 2021-10-28 19:34:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project\server_demo\src\views\mySpace\index.vue
-->
<template>
  <div class="mySpace">
    <ul class="mySpace_left">
      <li>系统概览</li>
      <li>累计发表了{{ allessay }}篇文章</li>
      <li>累计创建了{{ classify }}篇分类</li>
      <li>累计创建了{{ label }}篇标签</li>
      <li>累计上传了{{ images }}篇文件</li>
      <li>累计获得了{{ message }}篇评论</li>
    </ul>
    <div class="mySpace_right">
      <b>个人资料</b>
      <el-tabs v-model="activeName">
        <!-- 基本设置 -->
        <el-tab-pane label="基本设置" name="first">
          <!-- 头像 -->
          <div class="space_Img">
            <div class="two_upload">
              <el-upload
                class="upload-demo"
                action="/api/imgUpData"
                :onSuccess="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                multiple
              >
                <img :src="basicForm.img" alt />
              </el-upload>
            </div>
          </div>
          <el-form
            ref="basicForm"
            :model="basicForm"
            label-width="80px"
            class="demo-dynamic"
          >
            <el-form-item label="用户名:" prop="name">
              <el-input
                v-model="basicForm.name"
                type="age"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱:" type="email">
              <el-input
                v-model="basicForm.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="myScpace_but">
            <el-button type="primary" @click="upDataBasics">保存</el-button>
          </div>
        </el-tab-pane>
        <!-- 更新密码 -->
        <el-tab-pane label="更新密码" name="second">
          <div>
            <el-form
              ref="newForm"
              :model="newForm"
              label-width="100px"
              class="demo-dynamic"
            >
              <el-form-item
                label="原密码:"
                prop="oldPassword"
                :rules="[{ required: true, message: '原密码不能为空' }]"
              >
                <el-input
                  v-model="newForm.oldPassword"
                  type="password"
                  autocomplete="off"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item
                label="新密码:"
                prop="password"
                :rules="[{ required: true, message: '新密码不能为空' }]"
              >
                <el-input
                  v-model="newForm.password"
                  type="password"
                  autocomplete="off"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码:"
                prop="newPassword"
                :rules="[{ required: true, message: '确认密码不能为空' }]"
              >
                <el-input
                  v-model="newForm.newPassword"
                  type="password"
                  autocomplete="off"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="myScpace_but">
              <el-button type="primary" @click="upDataPassword">更新</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSpace, upDataPass, upDataBasic } from "../../api/Space";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      allessay: "",
      classify: "",
      label: "",
      images: "",
      message: "",
      activeName: "first",
      basicForm: {
        img: this.$store.state.user.img,
        name: this.$store.state.user.name,
        email: this.$store.state.user.email,
      },
      newForm: {
        oldPassword: "",
        password: "",
        newPassword: "",
      },
    };
  },
  methods: {
    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    async beforeAvatarUpload(file) {
      const isJPG =file.type === "image/jpeg"||file.type === "image/pneg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      return isJPG && isLt2M;
    },
    async getMySpace() {
      let resq = await getSpace("/api/setSpace");
      this.allessay = resq.data.allessay;
      this.classify = resq.data.classify;
      this.label = resq.data.label;
      this.images = resq.data.images;
      this.message = resq.data.message;
    },
    // 基本设置
    async upDataBasics() {
      let resq = await upDataBasic("/api/upDataBasic", {
        basicForm: this.basicForm,
        user: this.$store.state.user,
      });
      if (resq.data.code === 200) {
        ElMessage.success(resq.data.message);
      }
    },
    //更新密码
    async upDataPassword() {
      if (this.newForm.password !== this.newForm.newPassword) {
        ElMessage.error("两次密码不一致");
        return;
      }
      let resq = await upDataPass("/api/upDataPass", {
        user: this.$store.state.user,
        newForm: this.newForm,
      });
      if (resq.data.code === 400) {
        ElMessage.error(resq.data.message);
      } else {
        ElMessage.success(resq.data.message);
      }
    },
  },
  created() {
    this.getMySpace();
  },
};
</script>

<style lang='scss'>
.mySpace {
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
}
.mySpace_left {
  width: 47%;
  height: 100%;
  background-color: #fff;
  h4 {
    border-bottom: 1px solid #ccc;
  }
  li {
    text-align: left;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    font-size: 14px;
  }
}
.mySpace_right {
  width: 47%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  b {
    border-bottom: 1px solid #ccc;
    width: 100%;
    padding: 10px 10px;
    text-align: left;
  }
}
.el-tabs {
  padding: 0 10px;
}
.el-form-item__label {
  text-align: left;
}
.myScpace_but {
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
  .el-button {
    margin-left: 20px;
  }
}
.space_Img {
  width: 100%;
  margin-bottom: 20px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>