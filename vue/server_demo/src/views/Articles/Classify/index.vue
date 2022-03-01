<!--
 * @Author: your name
 * @Date: 2021-10-15 19:12:58
 * @LastEditTime: 2021-10-18 21:44:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\component\articles\index.vue
-->
<template>
  <div class="classifyAdmin">
    <!-- 添加分类模块 -->
    <div class="add-classify">
      <p>
        <span v-if="flag">添加分类</span>
        <span v-else>管理分类</span>
      </p>
      <el-form status-icon label-width="120px" class="demo-ruleForm">
        <!-- 分类名称 -->
        <el-form-item prop="pass">
          <el-input
            v-model="content.name"
            autocomplete="off"
            placeholder="请输入分类名称"
            style="margin-left: 0px"
          ></el-input>
        </el-form-item>
        <!-- 分类值 -->
        <el-form-item prop="checkPass">
          <el-input v-model="content.value" autocomplete="off" placeholder="请输入分类值（请输入英文，作为路由使用）"></el-input>
        </el-form-item>
        <!-- 保存按钮 -->
        <div class="classify-btn">
          <!-- 左侧按钮 -->
          <div class="btn-left">
            <el-form-item>
              <el-button type="primary" @click="save()">
                <span v-if="flag">保存</span>
                <span v-else>更新</span>
              </el-button>
              <el-button v-if="!flag" @click="back()">返回添加</el-button>
            </el-form-item>
          </div>
          <!-- 右侧按钮 -->
          <div class="btn-right">
            <el-button
              style="border: 1px solid red; color: red"
              v-if="!flag"
              @click="del_classify(this.content.id)"
            >删除</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <!-- 所有分类 -->
    <div class="all-classify">
      <div class="classify-item">
        <p>所有分类</p>
        <!-- 分类内容 -->
        <div class="classify-con">
          <el-button v-for="v in classifyList" :key="v.id" @click="echo(v)" size="mini">{{ v.name }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getClassify,
  addClassify,
  editClassify,
  delClassify,
} from "../../../api/Classify";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      //分类内容
      content: {
        name: "",
        value: "",
      },
      //分类列表
      classifyList: [],
      //控制编辑还是添加
      flag: true,
    };
  },
  created() {
    this.get_classify();
  },
  methods: {
    //保存按钮
    save() {
      this.flag ? this.add_classify() : this.edit_classify();
    },
    //获取分类列表
    async get_classify() {
      const res = await getClassify("/api/get_classify");
      if (res.data.statu === 200) {
        this.classifyList = res.data.data;
        this.content = {
          name: "",
          value: "",
        };
      }
    },
    //添加分类列表
    async add_classify() {
      const res = await addClassify("/api/add_classify", {
        content: this.content,
      });
      if (res.data.statu === 200) {
        this.get_classify();
        ElMessage.success(res.data.msg);
      }
    },
    //编辑分类列表
    async edit_classify() {
      const res = await editClassify("/api/edit_classify", {
        content: this.content,
      });
      if (res.data.statu === 200) {
        this.get_classify();
        ElMessage.success(res.data.msg);
        this.flag = true;
      }
    },
    //删除分类列表
    async del_classify(id) {
      const res = await delClassify("/api/del_classify", { id });
      if (res.data.statu === 200) {
        this.get_classify();
        ElMessage.success(res.data.msg);
        this.flag = true;
      }
    },
    //回显
    async echo(data) {
      this.flag = false;
      this.content = { ...data };
    },
    //返回
    back() {
      this.flag = true;
      this.content = {
        name: "",
        value: "",
      };
    },
  },
};
</script>
<style lang="scss">
.classifyAdmin {
  width: 100%;
  display: flex;
  //添加分类
  .add-classify {
    width: 400px;
    height: auto;
    background: #fff;
    p {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      text-indent: 2em;
      border-bottom: 1px solid #eee;
      margin-bottom: 22px;
    }
    .el-form {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-form-item__content {
        margin-left: 0px !important;
      }
      .el-input__inner {
        width: 350px;
        height: 35px;
      }
    }
    //按钮
    .classify-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .btn-left {
        flex: 1;
      }
      .btn-right {
        width: 120px;
      }
    }
    .el-button {
      margin-left: 22px;
    }
  }
  //所有分类
  .all-classify {
    flex: 1;
    margin-left: 20px;
    .classify-item {
      width: 100%;
      height: auto;
      background: #fff;
      p {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        text-indent: 2em;
        border-bottom: 1px solid #eee;
      }
      .classify-con {
        width: 100%;
        height: auto;
        padding: 20px;
      }
    }
  }
}
</style>
