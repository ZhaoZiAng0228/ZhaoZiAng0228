<!--
 * @Author: your name
 * @Date: 2021-10-13 18:50:03
 * @LastEditTime: 2021-10-20 19:27:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\training-group-3\server_demo\src\views\Home\Email\email.vue
-->
<template>
  <div>
    <main>
      <!-- 输入框 -->
      <el-card class="box-card">
        <el-form :inline="true" class="demo-form-inline search">
          <el-form-item label="发件人:">
            <el-input v-model="searchEmail.addresser" placeholder="请输入发件人"></el-input>
          </el-form-item>
          <el-form-item label="收件人:">
            <el-input v-model="searchEmail.recipients" placeholder="请输入收件人"></el-input>
          </el-form-item>
          <el-form-item label="主题:">
            <el-input v-model="searchEmail.theme" placeholder="请输入主题"></el-input>
          </el-form-item>
        </el-form>
        <ant-row class="btn">
          <el-button type="primary" @click="searchEmails">搜索</el-button>
          <el-button
            @click="searchEmail.addresser='',searchEmail.recipients='',searchEmail.theme=''"
          >重置</el-button>
        </ant-row>
      </el-card>
      <!-- 批量操作和刷新 -->
      <div class="batch_all">
        <div class="all_but" v-show="multipleSelection.length">
            <el-popconfirm
              title="确认删除？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-warning"
              icon-color="#FAAD14"
              @confirm="allDeleteEmails"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
        </div>
        <div class="all_new">
          <i class="el-icon-refresh-right" @click="this.getEmailList()"></i>
        </div>
      </div>
      <!-- 表格 -->
      <div class="souTable">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="addresser" label="发件人"></el-table-column>
          <el-table-column prop="recipients" label="收件人"></el-table-column>
          <el-table-column prop="theme" label="主题"></el-table-column>
          <el-table-column prop="date" label="发送时间"></el-table-column>
          <el-table-column label="操作" width="180px">
            <template #default="scope">
              <el-button type="text" size="small">
                <el-popconfirm
                  title="确认删除？"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  icon="el-icon-warning"
                  icon-color="#FAAD14"
                  @confirm="handleClick(scope.row.id)"
                >
                  <template #reference>
                    <el-button type="text">删除</el-button>
                  </template>
                </el-popconfirm>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    </main>
  </div>
</template>

<script>
import {
  getEmail,
  deleteEmail,
  allDeleteEmail,
  searchEmail,
} from "../../api/Email";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchEmail: {
        addresser: "",
        recipients: "",
        theme: "",
      },
      pageIndex: 1,
      pageSize: 4,
      total: 0,
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 邮件管理数据
    async getEmailList() {
      let resq = await getEmail("/api/getEmail", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.tableData = resq.data.emailList;
      this.total = resq.data.total;
    },
    // 邮件管理删除数据
    async handleClick(id) {
      let resq = await deleteEmail("/api/deleteEmail", { id });
      this.getEmailList();
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
    },
    // 邮件管理批量删除
    async allDeleteEmails() {
      let resq = await allDeleteEmail("/api/allDeleteEmail", {
        emailList: this.multipleSelection,
      });
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
        this.getEmailList()
      }
    },
    // 邮件管理模糊搜索
    async searchEmails() {
      let resq = await searchEmail("/api/searchEmail", {
        searchEmail: this.searchEmail,
      });
      this.tableData = resq.data.results;
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.getEmailList();
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getEmailList();
    },
  },
  created() {
    this.getEmailList();
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 30px;
}
.souTable {
  margin-top: 20px !important;
}
.souTable {
  width: 100%;
  margin-top: 50px;
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
.batch_all {
  width: 100%;
  height: 60px;
  background-color: #fff;
  margin-top: 20px;
  margin-bottom: -20px;
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
  .all_new {
    line-height: 60px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    .el-button {
      margin-right: 20px;
    }
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
