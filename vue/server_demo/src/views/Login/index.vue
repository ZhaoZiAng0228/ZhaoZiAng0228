<!--
 * @Author: your name
 * @Date: 2021-10-12 16:42:19
 * @LastEditTime: 2021-10-15 08:31:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \day1\server_demo\src\views\Login\index.vue
-->
<template>
  <div class="login">
    <!-- 背景大图片 -->

    <div id="login-bg" class="container-fluid">
      <div class="bg-img">
        <!-- <img src="" alt=""> -->
      </div>
    </div>

    <!-- 表单 -->

    <div class="container" id="login">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- 登录的表单 -->
          <div class="login_user">
            <h3>{{ title }}</h3>
            <el-form
              ref="dynamicValidateForm"
              :model="dynamicValidateForm"
              label-width="120px"
              class="demo-dynamic"
            >
              <el-form-item
                label="账号"
                prop="name"
                :rules="[{ required: true, message: '账号不能为空' }]"
              >
                <el-input
                  class="login_inp"
                  v-model="dynamicValidateForm.name"
                  type="age"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
                :rules="[{ required: true, message: '密码不能为空' }]"
              >
                <el-input
                  class="login_inp"
                  v-model="dynamicValidateForm.password"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="newPassword"
                :rules="[{ required: true, message: '确认密码不能为空' }]"
                v-if="isShow"
              >
                <el-input
                  class="login_inp"
                  v-model="dynamicValidateForm.newPassword"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-button
                class="login_but"
                type="primary"
                @click="submitForm('dynamicValidateForm')"
                >{{ tabLogin }}</el-button
              >
            </el-form>
            <span class="cut" @click="setIsShow">Or 去{{ login }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      title: "系统登录",
      login: "注册",
      tabLogin: "登录",
      isShow: false,
      dynamicValidateForm: {
        name: "",
        password: "",
        newPassword: "",
      },
    };
  },
  created() {},
  methods: {
    setIsShow() {
      /* 切换开关 */
      if (!this.isShow) {
        this.isShow = true;
        this.title = "访客注册";
        this.login = "登录";
        this.tabLogin = "注册";
      } else {
        this.isShow = false;
        this.title = "系统登录";
        this.login = "注册";
        this.tabLogin = "登录";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isShow) {
            // 当开关为true时,调用登录接口
            this.$store.dispatch("LOGIN_USER", {
              user: {
                name: this.dynamicValidateForm.name,
                password: this.dynamicValidateForm.password,
              },
            });
          } else {
            if (
              this.dynamicValidateForm.password !==
              this.dynamicValidateForm.newPassword
            ) {
              ElMessage.error("两次密码不一致");
              return;
            }
            // 当开关为false时,调用注册接口
            this.$store.dispatch("SIGN_USER", {
              user: {
                name: this.dynamicValidateForm.name,
                password: this.dynamicValidateForm.password,
                newPassword: this.dynamicValidateForm.newPassword,
              },
            });
          }
        } else {
          ElMessage({
            message: "账号或密码不能为空",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style>
#login-bg.container-fluid {
  padding: 0;
  height: 100%;
  position: absolute;
}
/* 背景图片的样式 */

.bg-img {
  width: 100%;
  vertical-align: top;
  padding: 0;
  margin-left: 0;
  height: 100%;
  display: inline-block;
  overflow: hidden;
}

.bg-color {
  margin-left: -5px;
}

.bg-img {
  background-image: url("../../images/注册.jpg");
  background-size: cover;
}

#login {
  padding-top: 10%;
  text-align: center;
  text-transform: uppercase;
}
/* 表单 */
.login_user {
  width: 90%;
  height: 450px;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  /* background-color: #fff; */
}

.login_user h3 {
  font-weight: bold;
  font-size: 30px;
  letter-spacing: 3px;
}

.login_user form {
  max-width: 420px;
  margin: 30px auto;
}
.cut {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 14px;
  color: #fff;
}
/* 表单的样式*/

.el-form {
  width: 80%;
  max-width: none !important;
}
.el-form-item__label {
  text-align: center;
}
.login_inp .el-input__inner {
  font-size: 20px;
  display: flex;
  justify-content: flex-start;
  font-weight: lighter;
  width: 68%;
  border: none;
  background-color: #f0f0f0;
  color: #465347 !important;
  padding: 26px 30px;
  border-radius: 50px;
  transition: 0.2s;
}
.login_but {
  width: 53%;
  height: 50px;
  background-color: #00b72e;
  font-size: 18px;
  border-radius: 100px;
  margin-top: 20px;
}

/* Media queries */

@media (max-width: 500px) {
  .bg-img,
  .bg-color {
    min-width: 100%;
    height: 50%;
    margin: 0;
  }

  .forgot-password {
    text-align: right;
    float: left;
    padding: 20px 0;
  }

  #login {
    padding-top: 50px;
  }
}
</style>