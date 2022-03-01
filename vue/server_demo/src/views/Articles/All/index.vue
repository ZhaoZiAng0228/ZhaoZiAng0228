<!--
 * @Author: your name
 * @Date: 2021-10-13 18:43:13
 * @LastEditTime: 2021-11-01 09:37:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\training-group-3\server_demo\src\views\Home\Articles\All\all.vue
-->
<template>
  <div>
    <!-- 输入框 -->
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="标题:">
          <el-input
            v-model="searchLine.title"
            placeholder="请输入账户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchLine.tion" placeholder=" ">
            <el-option label="已发布" value="访客"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchLine.classify" placeholder=" ">
            <el-option label="js" value="js"></el-option>
            <el-option label="css" value="css"></el-option>
            <el-option label="html" value="html"></el-option>
            <el-option label="es5" value="es5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <ant-row class="btn">
        <el-button type="primary" @click="allSearch">搜索</el-button>
        <el-button @click="allReset">重置</el-button>
      </ant-row>
    </el-card>
    <!-- 批量操作和刷新 -->
    <div class="batch_all">
      <div class="all_but" v-show="multipleSelection.length">
        <el-button @click="onOff('true')">发布</el-button>
        <el-button @click="onOff('false')">草稿</el-button>
        <el-button @click="onRole('true')">首焦推荐</el-button>
        <el-button @click="onRole('false')">撤销</el-button>
        <el-popconfirm
          title="确认删除？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon="el-icon-warning"
          icon-color="#FAAD14"
          @confirm="allDeleteAlls"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="all_new">
        <el-button type="primary" @click="$router.push(`/editor/?name=All`)"
          >新增</el-button
        >
        <i class="el-icon-refresh-right" @click="this.getAll()"></i>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="title" label="标题" width="150" />
      <el-table-column prop="tion" label="状态" width="120">
        <template #default="scope">
          <span class="okTion" v-if="scope.row.tion === 'true'">已发布</span>
          <span class="noTIon" v-else-if="scope.row.tion === 'false'"
            >草稿</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="classify" label="分类" width="120" />
      <el-table-column prop="tag" label="标签" width="120" />
      <el-table-column prop="num" label="阅读量" width="120" />
      <el-table-column prop="love" label="喜欢数" width="120" />
      <el-table-column prop="date" label="发布时间" width="300" />
      <el-table-column fixed="right" label="操作" width="400">
        <template #default="scope">
          <div class="All_but">
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  path: `/editor`,
                  query: {
                    id: scope.row.id,
                    allIsEdit: true,
                    edit: '文章编辑',
                  },
                })
              "
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.recommend === 'false'"
              @click="setRecommends('true', scope.row.id)"
              >首焦推荐</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.recommend === 'true'"
              @click="setRecommends('false', scope.row.id)"
              >撤销首焦</el-button
            >
            <el-button type="text" size="small">查看访问</el-button>
            <el-button type="text" size="small">
              <el-popconfirm
                title="确认删除？"
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon="el-icon-warning"
                icon-color="#FAAD14"
                @confirm="deleteEditor(scope.row.id)"
              >
                <template #reference>
                  <el-button type="text">删除</el-button>
                </template>
              </el-popconfirm>
            </el-button>
          </div>
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
  getAll,
  deleteEditor,
  searchEditor,
  setRecomment,
  allDeleteAll,
  allRecommend,
  allTion,
} from "../../../api/All";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      tableData: [],
      searchLine: {
        title: "",
        tion: "",
        classify: "",
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
    // 获取所有文章数据
    async getAll() {
      let resq = await getAll("/api/all", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.tableData = resq.data.allList;
      this.total = resq.data.total;
    },
    // 删除点击的文章
    async deleteEditor(id) {
      let resq = await deleteEditor("/api/deleteEditor", { id });
      this.pop(resq.data.code, resq.data.message);
      this.getAll();
    },
    // 所有文章的模糊搜索功能
    async allSearch() {
      let resq = await searchEditor("/api/allSearch", {
        searchLine: this.searchLine,
      });
      this.tableData = resq.data.results;
    },
    // 首焦推荐
    async setRecommends(type, id) {
      let resq = await setRecomment("/api/setRecomment", {
        type,
        id,
      });
      this.pop(resq.data.code, resq.data.message);
      this.getAll();
    },
    // 批量删除
    async allDeleteAlls() {
      let resq = await allDeleteAll("/api/allDeleteAll", {
        allLists: this.multipleSelection,
      });
      this.pop(resq.data.code, resq.data.message);
      this.getAll();
    },
    //批量发布
    async onOff(off) {
      let resq = await allTion("/api/all/allTion", {
        tion: this.multipleSelection,
        judge: off,
      });
      this.pop(resq.data.code, resq.data.message);
      this.getAll();
    },
    //批量首焦
    async onRole(off) {
      let resq = await allRecommend("/api/allRecommend", {
        recommend: this.multipleSelection,
        judge: off,
      });
      this.pop(resq.data.code, resq.data.message);
      this.getAll();
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.getAll();
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAll();
    },
    //重置按钮
    allReset() {
      this.searchLine.title = "";
      this.searchLine.tion = "";
      this.searchLine.classify = "";
    },
    pop(resq, messages) {
      if (resq === 200) {
        ElMessage({
          message: messages,
          type: "success",
        });
      } else {
        ElMessage({
          message: messages,
          type: "error",
        });
      }
    },
  },
  created() {
    this.getAll();
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
.All_but {
  display: flex;
  justify-content: space-around;
  .el-button {
    font-size: 14px;
  }
}

.okTion::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: green;
  margin-right: 8px;
}
.noTIon::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #faad14;
  margin-right: 8px;
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
