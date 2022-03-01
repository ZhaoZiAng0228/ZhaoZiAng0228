<!--
 * @Author: your name
 * @Date: 2021-10-13 16:45:32
 * @LastEditTime: 2021-10-20 11:05:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\views\View\index.vue
-->
<template>
  <div class="visit">
    <div class="ViewMain">
      <!-- 输入框 -->
      <div class="ViewMainTop" style="margin-bottom:15px">
        <el-card style="padding-top:0;">
          <!-- IP输入 -->
          <el-form ref="form" :inline="true" class="demo-form-inline" label-width="80px">
            <el-form-item label="IP:">
              <el-input v-model="AllForm.ip" placeholder="请输入IP地址"></el-input>
            </el-form-item>
            <!-- User Agent输入 -->
            <el-form-item label="UA:">
              <el-input v-model="AllForm.userAgent" placeholder="请输入User Agent"></el-input>
            </el-form-item>
            <!-- URL输入 -->
            <el-form-item label="URL:">
              <el-input v-model="AllForm.url" placeholder="请输入URL"></el-input>
            </el-form-item>
            <!-- 地址输入 -->
            <el-form-item label="地址:">
              <el-input v-model="AllForm.address" placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="form" :inline="true" class="demo-form-inline" label-width="80px">
            <el-form-item label="浏览器:">
              <el-input v-model="AllForm.browser" placeholder="请输入浏览器"></el-input>
            </el-form-item>
            <!-- kernel内核输入 -->
            <el-form-item label="内核:">
              <el-input v-model="AllForm.engine" placeholder="请输入内核"></el-input>
            </el-form-item>
            <!-- OS输入 -->
            <el-form-item label="OS:">
              <el-input v-model="AllForm.os" placeholder="请输入OS"></el-input>
            </el-form-item>
            <!-- 设备输入 -->
            <el-form-item label="设备">
              <el-input v-model="AllForm.device" placeholder="请输入设备"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn" style="display:flex;justify-content: flex-end;">
            <el-button type="primary" @click="searchVisit()">搜索</el-button>
            <el-button @click="visitReset">重置</el-button>
          </div>
        </el-card>
      </div>
      <!-- 批量操作和刷新 -->
      <div class="batch_all">
        <div class="all_but" v-show="multipleSelection.length">
          <el-button type="danger" plain @click="allDeleteVisits">删除</el-button>
        </div>
        <div class="all_new">
          <i class="el-icon-refresh-right" @click="this.getVisitList()"></i>
        </div>
      </div>
      <!-- 表格 -->
      <div class="ViewMainBottom">
        <el-table :data="tableData" max-height="500" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column fixed prop="url" label="URL" width="150"></el-table-column>
          <el-table-column prop="ip" label="IP" width="150"></el-table-column>
          <el-table-column prop="browser" label="浏览器" width="150"></el-table-column>
          <el-table-column prop="engine" label="内核" width="150"></el-table-column>
          <el-table-column prop="os" label="操作系统" width="150"></el-table-column>
          <el-table-column prop="zip" label="设备" width="150"></el-table-column>
          <el-table-column prop="address" label="地址" width="150"></el-table-column>
          <el-table-column label="访问量" width="150">
            <template #default="scope">
              <span class="icon_count">{{ scope.row.count}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_at" label="访问时间" width="150"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button type="text" size="small">
                <el-popconfirm
                  title="确认删除？"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  icon="el-icon-warning"
                  icon-color="#FAAD14"
                  @confirm="deleteVisit(scope.row.id)"
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
          :page-sizes="[10, 20, 50,100]"
          :page-size="pageSize"
          :total="total"
          layout=" prev ,pager ,next,sizes"
          @size-change="handleSizeChange"
          @current-change="handleChangeIndex"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getVisit,
  deleteVisit,
  allDeleteVisit,
  searchVisit,
} from "../../api/Visit";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      AllForm: {
        ip: "",
        userAgent: "",
        url: "",
        address: "",
        browser: "",
        engine: "",
        os: "",
        device: "",
      },
      tableData: [],
      multipleSelection: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取访问统计页面数据
    async getVisitList() {
      let resq = await getVisit("/api/getVisit", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.tableData = resq.data.visitList;
      this.total = resq.data.total;
    },
    // 访问统计数据删除
    async deleteVisit(id) {
      let resq = await deleteVisit("/api/deleteVisit", { id });
      this.getVisitList();
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
    },
    // 访问统计数据批量删除
    async allDeleteVisits() {
      let resq = await allDeleteVisit("/api/allDeleteVisit", {
        visitList: this.multipleSelection,
      });
      this.getVisitList();
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
    },
    // 访问统计页面搜索
    async searchVisit() {
      let resq = await searchVisit("/api/searchVisit", {
        AllForm: this.AllForm,
      });
      if (resq.data.code === 200) {
        ElMessage({
          message: resq.data.message,
          type: "success",
        });
      }
      this.tableData = resq.data.result;
    },
    // 访问统计页面重置
    visitReset() {
      this.AllForm.ip = "";
      this.AllForm.userAgent = "";
      this.AllForm.url = "";
      this.AllForm.address = "";
      this.AllForm.browser = "";
      this.AllForm.engine = "";
      this.AllForm.os = "";
      this.AllForm.device = "";
    },
    // 改变页数
    handleChangeIndex(val) {
      this.pageIndex = val;
      this.getVisitList();
    },
    //改变条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getVisitList();
    },
  },
  created() {
    this.getVisitList();
  },
};
</script>
<style lang="scss" scoped>
.visit {
  // margin-top: 30px;
  .ViewMain {
    width: 98%;
    height: 100%;
    .ViewMainTop {
      width: 100%;
      background-color: #fff;
      padding-top: 20px;
      .el-form {
        display: flex;
        padding-right: 10px;
        align-items: center;
        justify-content: space-between;
        margin-top: 6px;
      }
      .btns {
        width: 100%;
        align-items: center;
        justify-content: space-between;
      }
    }
    .ViewMainBottom {
      margin-top: 20px;
    }
  }
}
.visit .ViewMain .ViewMainTop {
  padding-top: 0;
}
.search {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form--inline .el-form-item {
    flex-shrink: 1;
    width: calc(90% / 4);
    margin: 0px;
  }
}
.btn {
  display: flex;
  justify-content: flex-end;
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
.View main .ViewMain .ViewMainTop[data-v-08087af1] {
  width: 90%;
  padding-top: 6px;
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
