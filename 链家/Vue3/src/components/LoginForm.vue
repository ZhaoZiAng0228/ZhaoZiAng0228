<template>
  <el-form
    :model="loginUser"
    label-width="120px"
    class="loginForm sign-in-form"
    :rules="rules"
    ref="loginForm"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="loginUser.email"
        placeholder="Enter email..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginUser.password"
        type="password"
        placeholder="Enter password..."
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="handleLogin('loginForm')"
        >登录</el-button
      >
    </el-form-item>
    <!-- 第三方登录 -->
    <div class="tiparea">
      <p><a id="oauthLogin" @click="oauthLogin">第三方码云登录</a></p>
    </div>
  </el-form>
</template>

<script lang='ts'>
import { getCurrentInstance, reactive, toRefs } from "vue";
import axios from "../utils/request";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
export default {
  props: {
    loginUser: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    const state = reactive({
      showDialog: false,
    });
    const store = useStore();
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    // 登录方法
    const handleLogin = (formName: String) => {
      // @ts-ignore
      proxy.$refs[formName].validate((valid: Boolean) => {
        if (valid) {
          // console.log(props.loginUser);
          axios
            .post("/api/manager/login", { ...props.loginUser })
            .then((res: any) => {
              if (res.data.code === 200) {
                // console.log(res.data.data);
                store.commit("setUserInfo", res.data.data);
                localStorage.setItem("userInfo", JSON.stringify(res.data.data));
                localStorage.setItem("managerToken", res.data.token);
                localStorage.setItem("author", res.data.data.role);
                store.commit("getRouter", localStorage.getItem("author"));

                // router.push("/HouseResource");
                ElMessage({
                  message: "登录成功!",
                  type: "success",
                });
              } else {
                ElMessage.error("账号或密码错误,请重新输入!");
              }
            });
        } else {
          ElMessage.error("内容不能为空");
          return false;
        }
      });
    };

    // 第三方登录
    const oauthLogin = () => {
      const client_id =
        "0c1d5109ab8eaf666838b3edbed4d30ba8d207d267d10d81930fd85b617ce492";

      const authorize_uri = "https://gitee.com/oauth/authorize";
      const redirect_uri = "http://localhost:7001/oauth/redirect";
      localStorage.setItem("managerToken", "111");
      localStorage.setItem("author", "0");

      const link: any = document.getElementById("oauthLogin");
      // console.log(link);

      link.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    };
    return {
      ...toRefs(state),
      handleLogin,
      oauthLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
/* form */
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
  cursor: pointer;
}
.tiparea p a {
  color: #409eff;
}
</style>