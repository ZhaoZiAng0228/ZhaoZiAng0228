<!--
 * @Author: your name
 * @Date: 2021-10-13 18:52:05
 * @LastEditTime: 2021-10-22 11:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\training-group-3\server_demo\src\views\Home\User\user.vue
-->
<template>
  <div class="user_home">
    <!-- 输入框 -->
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="账户:">
          <el-input
            v-model="searchLine.name"
            placeholder="请输入账户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input
            v-model="searchLine.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchLine.role" placeholder="请选择角色">
            <el-option label="访客" value="访客"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchLine.tion" placeholder="请选择状态">
            <el-option label="锁定" value="锁定"></el-option>
            <el-option label="可用" value="可用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <ant-row class="btn">
        <el-button type="primary" @click="userSearch">搜索</el-button>
        <el-button @click="userReset">重置</el-button>
      </ant-row>
    </el-card>
    <!-- 批量操作和刷新 -->
    <div class="batch_user">
      <div class="all_but" v-show="multipleSelection.length">
        <el-button @click="onOff('false')">启用</el-button>
        <el-button @click="onOff('true')">禁用</el-button>
        <el-button @click="onRole('访客')">解除授权</el-button>
        <el-button @click="onRole('管理员')">授权</el-button>
      </div>
      <i
        class="el-icon-refresh-right"
        @click="
          (onreRresh) => {
            this.gainUser();
          }
        "
      ></i>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="name" label="账户" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="tion" label="状态">
        <template #default="scope">
          <span class="noTion" v-if="scope.row.tion === 'false'">可用</span>
          <span class="okTIon" v-else-if="scope.row.tion === 'true'"
            >已锁定</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册日期" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            v-if="scope.row.tion === 'false'"
            type="text"
            size="small"
            @click="handleSetTion(scope.row)"
            >禁用</el-button
          >
          <el-button
            v-else-if="scope.row.tion === 'true'"
            type="text"
            size="small"
            @click="handleSetTion(scope.row)"
            >启用</el-button
          >
          <el-button
            v-if="scope.row.role === '访客'"
            type="text"
            size="small"
            @click="handleSetRole(scope.row)"
            >授权</el-button
          >
          <el-button
            v-else-if="scope.row.role === '管理员'"
            type="text"
            size="small"
            @click="handleSetRole(scope.row)"
            >解除授权</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  getUser,
  setTion,
  setRole,
  getSearch,
  allTion,
  allRole,
} from "../../api/User";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      searchLine: {
        name: "",
        email: "",
        role: "",
        tion: "",
      },
      tableData: [],
      multipleSelection: [],
      pageIndex: 1,
      pageSize: 4,
      total: 0,
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 修改状态
    async handleSetTion(row) {
      let resq;
      if (row.tion === "true") {
        resq = await setTion("/api/tion", {
          tion: row,
          judge: "false",
        });
      } else {
        resq = await setTion("/api/tion", {
          tion: row,
          judge: "true",
        });
      }
      this.pop(resq.data.code, resq.data.message);
    },
    // 修改角色权限
    async handleSetRole(row) {
      let resq;
      if (row.role === "访客") {
        resq = await setRole("/api/role", { role: row, judge: "管理员" });
        this.pop(resq.data.code, resq.data.message);
      } else {
        resq = await setRole("/api/role", { role: row, judge: "访客" });
      }
      this.pop(resq.data.code, resq.data.message);
    },
    // 用户管理页面搜索功能
    async userSearch() {
      let resq = await getSearch("/api/userSearch", {
        searchLine: this.searchLine,
      });
      this.tableData = resq.data.results;
    },
    //批量修改状态
    async onOff(off) {
      let resq = await allTion("/api/allTion", {
        tion: this.multipleSelection,
        judge: off,
      });
      this.pop(resq.data.code, resq.data.message);
    },
    //批量修改角色权限
    async onRole(off) {
      let resq = await allRole("/api/allRole", {
        role: this.multipleSelection,
        judge: off,
      });
      this.pop(resq.data.code, resq.data.message);
    },
    // 重置按钮
    userReset() {
      this.searchLine.name = "";
      this.searchLine.email = "";
      this.searchLine.role = "";
      this.searchLine.tion = "";
    },
    pop(resq, messages) {
      if (resq === 200) {
        ElMessage({
          message: messages,
          type: "success",
        });
        this.gainUser();
      } else {
        ElMessage({
          message: messages,
          type: "error",
        });
      }
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.gainUser();
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.gainUser();
    },
    // 获取用户管理页面数据
    async gainUser() {
      let resq = await getUser("/api/user", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.tableData = resq.data.userList;
      this.total = resq.data.total;
    },
  },
  created() {
    this.gainUser();
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
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
.noTion::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: green;
  margin-right: 8px;
}

.okTIon::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #faad14;
  margin-right: 8px;
}
.el-table--fit {
  margin-top: 20px;
}
.batch_user {
  width: 100%;
  height: 60px;
  background-color: #fff;
  margin-bottom: -20px;
  margin-top: 20px;
  display: flex;
  position: relative;
  line-height: 60px;
  justify-content: center;
  .all_but {
    display: flex;
    flex: 1;
    padding-left: 10px;
    .el-button {
      height: 35px;
      margin-top: 10px;
    }
  }
  .el-icon-refresh-right {
    line-height: 60px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.demo-pagination-block {
  height: 80px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
