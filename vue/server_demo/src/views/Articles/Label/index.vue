<!--
 * @Author: your name
 * @Date: 2021-10-15 19:12:58
 * @LastEditTime: 2021-10-18 21:49:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\component\articles\index.vue
-->
<template>
  <div class="classifyAdmin">
    <!-- 添加标签模块 -->
    <div class="add-classify">
      <p><span v-if="flag">添加标签</span><span v-else>管理标签</span></p>
      <el-form status-icon label-width="120px" class="demo-ruleForm">
        <el-form-item prop="pass">
          <el-input
            v-model="content.name"
            autocomplete="off"
            placeholder="请输入标签名称"
            style="margin-left: 0px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            v-model="content.value"
            autocomplete="off"
            placeholder="请输入标签值（请输入英文，作为路由使用）"
          ></el-input>
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
              @click="del_label(this.content.id)"
              >删除</el-button
            >
          </div>
        </div>
      </el-form>
    </div>
    <!-- 所有标签 -->
    <div class="all-classify">
      <div class="classify-item">
        <p>所有标签</p>
        <!-- 标签内容 -->
        <div class="classify-con">
          <el-button
            v-for="v in labelList"
            :key="v.id"
            @click="echo(v)"
            size="mini"
            >{{ v.name }}</el-button
          >
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getLabel,
  addLabel,
  editLabel,
  delLabel,
} from "../../../api/label";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      //标签内容
      content: {
        name: "",
        value: "",
      },
      //标签列表
      labelList: [],
      //控制编辑还是添加
      flag: true,
    };
  },
  created() {
    this.get_label();
  },
  methods: {
    //保存按钮
    save() {
      this.flag ? this.add_label() : this.edit_label();
    },
    //获取标签列表
    async get_label() {
      const res = await getLabel('/api/get_label');
      if (res.data.statu === 200) {
        this.labelList = res.data.data;
        this.content = {
          name: "",
          value: "",
        };
      }
    },
    //添加标签列表
    async add_label() {
      const res = await addLabel('/api/add_label',{
        content: this.content,
      });
      if (res.data.statu === 200) {
        this.get_label();
        ElMessage.success(res.data.msg);
      }
    },
    //编辑标签列表
    async edit_label() {
      const res = await editLabel('/api/edit_label',{
        content: this.content,
      });
      if (res.data.statu === 200) {
        this.get_label();
        ElMessage.success(res.data.msg);
        this.flag = true;
      }
    },
    //删除标签列表
    async del_label(id) {
      const res = await delLabel('/api/del_label',{ id });
      if (res.data.statu === 200) {
        this.get_label();
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
  //添加标签
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
  //所有标签
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
