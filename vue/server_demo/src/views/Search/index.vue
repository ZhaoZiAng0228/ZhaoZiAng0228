<!--
 * @Author: your name
 * @Date: 2021-10-13 18:51:06
 * @LastEditTime: 2021-10-20 14:49:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\training-group-3\server_demo\src\views\Home\Search\search.vue
-->
<template>
  <div>
    <main>
      <!-- 输入框 -->
      <el-card class="box-card">
        <el-form :inline="true" class="demo-form-inline search">
          <el-form-item label="类型:">
            <el-input v-model="dimSearchHistory.type" placeholder="请输入搜索类型"></el-input>
          </el-form-item>
          <el-form-item label="搜索词:">
            <el-input v-model="dimSearchHistory.content" placeholder="请输入搜索词"></el-input>
          </el-form-item>
          <el-form-item label="搜索量:">
            <el-input v-model="dimSearchHistory.count" placeholder="请输入搜索量"></el-input>
          </el-form-item>
        </el-form>
        <ant-row class="btn">
          <el-button type="primary" @click="dimSearchHistorys">搜索</el-button>
          <el-button
            @click="dimSearchHistory.type='',dimSearchHistory.content='',dimSearchHistory.count=''"
          >重置</el-button>
        </ant-row>
      </el-card>
      <!-- 批量操作和刷新 -->
      <div class="batch_all">
        <div class="all_but" v-show="multipleSelection.length">
          <el-button type="danger" plain @click="allDeleteSearch">删除</el-button>
        </div>
        <div class="all_new">
          <i class="el-icon-refresh-right" @click="this.getSearchHistory()"></i>
        </div>
      </div>
      <!-- 表格 -->
      <div class="souTable">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="content" label="搜索词"></el-table-column>
          <el-table-column label="搜索量">
            <template #default="scope">
              <span class="icon_count">{{ scope.row.count}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="搜索日期"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="text" size="small">
                <el-popconfirm
                  title="确认删除？"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  icon="el-icon-warning"
                  icon-color="#FAAD14"
                  @confirm="deleteSearchs(scope.row.id)"
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
  getSearch,
  deleteSearch,
  allDeleteSearch,
  searchHistory,
} from "../../api/search";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      //默认数据总数
      total: 500,
      //每页的数据条数
      pagesize: 5,
      //默认开始页面
      currentPage: 1,
      typeInput: "",
      termsInput: "",
      volumeInput: "",
      tableData: [],
      dimSearchHistory: {
        type: "",
        content: "",
        count: "",
      },
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "th";
      }
      return "";
    },
    created: function () {
      this.total = this.tableData.length;
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage;
    },
    // 获取搜索记录页面数据
    async getSearchHistory() {
      let resq = await getSearch("/api/getSearch", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.tableData = resq.data.searchList;
      this.total = resq.data.total;
    },
    // 删除搜索记录页面数据
    async deleteSearchs(id) {
      let resq = await deleteSearch("/api/deleteSearch", { id });
      this.getSearchHistory();
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
    },
    // 批量删除搜索记录页面数据
    async allDeleteSearch() {
      let resq = await allDeleteSearch("/api/allDeleteSearch", {
        searchHistoryList: this.multipleSelection,
      });
      this.getSearchHistory();
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
    },
    // 搜索记录页面搜索
    async dimSearchHistorys() {
      let resq = await searchHistory("/api/SearchHistory", {
        dimSearchHistory: this.dimSearchHistory,
      });
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
      this.tableData = resq.data.result;
    },
    // 搜索记录页面重置
    visitReset() {
      this.dimSearchHistory.type = "";
      this.dimSearchHistory.content = "";
      this.dimSearchHistory.count = "";
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.getSearchHistory();
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSearchHistory();
    },
  },
  created() {
    this.getSearchHistory();
  },
};
</script>

<style lang="scss" scoped>
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
main {
  margin-top: 30px;
}
.sou {
  height: 100px;
  height: 150px;
  display: flex;
  background-color: #fff;
  padding-top: 20px;
  justify-content: space-around;
  p {
    margin-left: 50px;
  }
}
.souTable {
  width: 100%;
  margin-top: 20px;
}
.icon_count {
  display: block;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  background: rgb(82, 196, 26);
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
