<template>
  <el-form
    ref="registerForm"
    :model="registerUser"
    :rules="registerRules"
    label-width="100px"
    class="registerForm sign-up-form"
  >
    <el-form-item label="用户名" prop="name">
      <el-input
        v-model="registerUser.name"
        placeholder="Enter username..."
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="registerUser.email"
        placeholder="Enter email..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="registerUser.password"
        type="password"
        placeholder="Enter password..."
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
        v-model="registerUser.password2"
        type="password"
        placeholder="Enter password..."
      ></el-input>
    </el-form-item>

    <el-form-item label="选择身份" class="select-charactor">
      <el-select
        v-model="registerUser.role"
        placeholder="Please select identity..."
      >
        <el-option label="管理员" value="0"></el-option>
        <el-option label="经纪人" value="1"></el-option>
        <!-- <el-option label="普通员工" value="2"></el-option> -->
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleRegister('registerForm')"
        type="primary"
        class="submit-btn"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import axios from "../utils/request";
// import axios from 'axios' // 仅限在当前组件使用
export default {
  props: {
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const handleRegister = (formName: string) => {
      // @ts-ignore
      proxy.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          // console.log(props.registerUser);
          axios
            .post("/api/manager/register", { ...props.registerUser })
            .then((res: any) => {
              // console.log(ctx);
              if (res.data.code === 200) {
                ElMessage({
                  message: "注册成功,请登录!",
                  type: "success",
                });
              } else {
                ElMessage.error("账号已被注册!");
              }
            });
        } else {
          console.log("error");
          return false;
        }
      });
    };

    return { handleRegister };
  },
};
</script>
<style scoped>
.submit-btn,
.select-charactor,
.el-select {
  width: 100%;
}
</style>
