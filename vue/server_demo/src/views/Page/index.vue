<!--
 * @Author: your name
 * @Date: 2021-10-13 16:48:15
 * @LastEditTime: 2021-10-20 19:30:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\views\Page\index.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-10-14 14:39:38
 * @LastEditTime: 2021-10-15 22:38:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\views\Home\pageAdmin\index.vue
-->
<template>
  <div class="page">
    <!-- 输入框 -->
    <el-card class="box-card" style="margin-bottom: 20px;">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="名称:">
          <el-input v-model="searchPageList.name" placeholder="请输入名称:"></el-input>
        </el-form-item>
        <el-form-item label="路径:">
          <el-input v-model="searchPageList.url" placeholder="请输入路径"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchPageList.statu" placeholder="请选择状态">
            <el-option label="草稿" value="草稿"></el-option>
            <el-option label="已发布" value="已发布"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn" style="display:flex;justify-content: flex-end;">
        <el-button type="primary" @click="searchPages">搜索</el-button>
        <el-button @click="searchPageList.name='',searchPageList.url='',searchPageList.statu=''">重置</el-button>
      </div>
    </el-card>
    <!-- 批量操作和刷新 -->
    <div class="batch_all">
      <div class="all_but" v-show="multipleSelection.length">
        <el-button @click="PageOff('已发布')">发布</el-button>
        <el-button @click="PageOff('草稿')">下线</el-button>
        <el-popconfirm
          title="确认删除？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon="el-icon-warning"
          icon-color="#FAAD14"
          @confirm="allDeletePages"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="all_new">
        <el-button type="primary" @click="this.$router.push(`/editor/?name=${this.$route.name}`)">新增</el-button>
        <i class="el-icon-refresh-right" @click="this.getPages()"></i>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="名称" width="100" />
      <el-table-column prop="url" label="路径" />
      <el-table-column prop="sequence" label="顺序" width="60" />
      <el-table-column label="阅读量" width="80">
        <template #default="scope">
          <span class="icon_count">{{ scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template #default="scope">
          <span class="noTion" v-if="scope.row.statu==='草稿'">草稿</span>
          <span class="okTion" v-else-if="scope.row.statu==='已发布'">已发布</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间" width="200"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <span
            style="color:#1890ff;	margin-right: 5px;"
            @click="$router.push({
                path:`/editor`,
                query:{
                  id:scope.row.id,
                  pageIsEdit:true,
                  edit:'页面编辑'
                  }
              })"
          >编辑</span>
          <span :id="scope.row.id" style="color:#eee;	margin-right: 5px;">|</span>
          <span
            style="color:#1890ff;	margin-right: 5px;"
            v-if="scope.row.statu==='已发布'"
            @click="alterStatu('草稿',scope.row.id)"
          >下线</span>
          <span
            style="color:#1890ff;	margin-right: 5px;"
            v-else-if="scope.row.statu==='草稿'"
            @click="alterStatu('已发布',scope.row.id)"
          >发布</span>
          <span style="color:#eee;	margin-right: 5px;">|</span>
          <span style="color:#1890ff;	margin-right: 5px;">查看访问</span>
          <span style="color:#eee;	margin-right: 5px;">|</span>
          <span style="color:#1890ff;	margin-right: 5px;">
            <el-popconfirm
              title="确认删除？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="el-icon-warning"
              icon-color="#FAAD14"
              @confirm="deletePages(scope.row.id)"
            >
              <template #reference>
                <el-button type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
import {
  getPage,
  typePage,
  deletePage,
  allDeletePage,
  allOffPage,
  searchPage,
} from "../../api/Page";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      searchPageList: {
        name: "",
        url: "",
        statu: "",
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
    // 页面管理数据
    async getPages() {
      let resq = await getPage("/api/getPage", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.tableData = resq.data.pageList;
      this.total = resq.data.total;
    },
    // 页面管理数据删除
    async deletePages(id) {
      let resq = await deletePage("/api/deletePage", { id });
      this.pop(resq.data.code, resq.data.message);
    },
    // 批量删除页面管理数据
    async allDeletePages() {
      let resq = await allDeletePage("/api/allDeletePage", {
        pageList: this.multipleSelection,
      });
      this.pop(resq.data.code, resq.data.message);
    },
    // 页面管理修改数据状态
    async alterStatu(type, id) {
      let resq = await typePage("/api/typePage", { type, id });
      this.pop(resq.data.code, resq.data.message);
    },
    // 批量修改评页面管理页面状态
    async PageOff(type) {
      let resq = await allOffPage("/api/PageOff", {
        pageList: this.multipleSelection,
        type,
      });
      this.pop(resq.data.code, resq.data.message);
    },
    // 页面管理搜索
    async searchPages() {
      let resq = await searchPage("/api/searchPage", {
        searchPageList: this.searchPageList,
      });
      if (resq === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
      this.tableData = resq.data.result;
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.getPages();
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPages();
    },
    pop(resq, messages) {
      if (resq === 200) {
        ElMessage({
          message: messages,
          type: "success",
        });
        this.getPages();
      } else {
        ElMessage({
          message: messages,
          type: "error",
        });
      }
    },
  },
  created() {
    this.getPages();
  },
};
</script>

<style lang='scss'>
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
.noTion::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #faad14;
  margin-right: 8px;
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
