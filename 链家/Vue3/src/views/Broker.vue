// 经纪人管理
<template>
  <div class="broker">
    <el-card class="broker-card">
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <!-- 手机号姓名 -->
        <el-form-item label="搜索">
          <el-input
            v-model="searchForm.info"
            placeholder="请输入经纪人姓名/手机号"
          ></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-select v-model="searchForm.state" placeholder="请选择">
            <el-option label="在职" value="在职"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>
        <!-- 新建查询按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="info" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleCreate">新建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格主体 -->
    <div class="broker-box">
      <el-table
        :data="tableData"
        style="width:100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="tel" label="手机号" />
        <el-table-column prop="company" label="公司" />
        <el-table-column prop="newHouse" label="新房" />
        <el-table-column prop="secondHandHouse" label="二手房" />
        <el-table-column prop="renting" label="租房" />
        <el-table-column prop="state" label="状态" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleStart(scope.row)"
              >启用</el-button
            >

            <el-button size="mini" type="danger" @click="handleStop(scope.row)"
              >禁用</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog v-model="dialogVisible" title="新增/编辑经纪人" width="35%">
      <!-- 弹框内容 -->
      <el-form :model="borkerForm">
        <!-- 经纪人姓名 -->
        <el-form-item>
          <el-input
            v-model="borkerForm.name"
            placeholder="请输入经纪人姓名"
          ></el-input>
        </el-form-item>
        <!-- 经纪人手机号 -->

        <el-form-item>
          <el-input
            v-model="borkerForm.tel"
            placeholder="请输入经纪人手机号"
          ></el-input>
        </el-form-item>
        <!-- 所数公司 -->
        <el-form-item>
          <el-select
            v-model="borkerForm.company"
            placeholder="请选择所属公司"
            style="width:100%"
          >
            <el-option label="宏烨地产一部" value="宏烨地产一部"></el-option>
            <el-option label="宏烨地产二部" value="宏烨地产二部"></el-option>
          </el-select>
        </el-form-item>
        <!-- 新房 -->
        <el-form-item>
          <el-input
            v-model="borkerForm.newHouse"
            placeholder="请输入新房业绩"
          ></el-input>
        </el-form-item>
        <!-- 请输入租房业绩 -->
        <el-form-item>
          <el-input
            v-model="borkerForm.secondHandHouse"
            placeholder="请输入二手房业绩"
          ></el-input>
        </el-form-item>
        <!-- 请输入租房业绩 -->
        <el-form-item>
          <el-input
            v-model="borkerForm.renting"
            placeholder="请输入租房业绩"
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onConfirm">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 分页 -->
    <div class="demo-pagination-block">
      <div class="place"></div>
      <el-pagination
        v-model="page.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="page.pageSize"
        layout="sizes, prev, pager, next"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import { getList, addList, editList, delList, searchList } from "../api/broker";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  setup() {
    //   数据
    const state = reactive({
      tableData: [],
      //   搜索框内容
      searchForm: {
        info: "",
        state: "",
      },
      //   弹框内容
      borkerForm: {
        name: "", //姓名
        tel: "", //手机号
        company: "", //公司
        newHouse: "", //新房
        secondHandHouse: "", //二手房
        renting: "", //租房
        state: "", //状态
      },
      //    弹框显示与否
      dialogVisible: false,
      //   是否为创建
      isCreate: true,
      page: {
        currentPage: 1, //当前页数
        pageSize: 5, //每页条数
        total: 42, //总条数
      },
    });

    //查询
    const handleSearch = async () => {
      getData();
      // const res = await searchList({ searchData: state.searchForm });
      // console.log(res);
      state.searchForm = {
        info: "",
        state: "",
      };
    };
    //重置
    const handleReset = async () => {
      state.searchForm = {
        info: "",
        state: "",
      };
      getData();
    };

    //新建
    const handleCreate = () => {
      // 设为创建
      state.isCreate = true;
      //打开弹框
      state.dialogVisible = true;
    };
    // 编辑
    const handleEdit = (row) => {
      state.borkerForm = Object.assign({ ...state.borkerForm, ...row });
      // 设为编辑
      state.isCreate = false;
      //打开弹框
      state.dialogVisible = true;
    };
    // 删除
    const handleDelete = async (row) => {
      ElMessageBox.confirm("确定要删除么", "提示信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delList({ params: { id: row.id } });
          if (res.data.code === 1) {
            ElMessage({
              message: res.data.message,
              type: "success",
            });
            getData();
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    };
    // 启用
    const handleStart = async (row) => {
      const res = await editList({
        editData: { ...row, state: "在职" },
      });
      if (res.data.code === 1) {
        ElMessage({
          message: res.data.message,
          type: "success",
        });
        getData();
      }
    };
    // 停用
    const handleStop = async (row) => {
      const res = await editList({
        editData: { ...row, state: "离职" },
      });
      if (res.data.code === 1) {
        ElMessage({
          message: res.data.message,
          type: "success",
        });
        getData();
      }
    };
    // 改变每页条数 1
    const handleSizeChange = (val) => {
      state.page.pageSize = val;
      getData();
    };
    // 改变当前的页码 1
    const handleCurrentChange = async (val) => {
      state.page.currentPage = val;
      getData();
    };
    //弹框确定按钮
    const onConfirm = async () => {
      if (state.isCreate) {
        // 创建
        const res = await addList({ addData: state.borkerForm });
        if (res.data.code === 1) {
          ElMessage({
            message: res.data.message,
            type: "success",
          });
        }
      } else {
        // 编辑
        const res = await editList({ editData: state.borkerForm });
        if (res.data.code === 1) {
          ElMessage({
            message: res.data.message,
            type: "success",
          });
        }
      }
      // 关闭弹框
      state.dialogVisible = false;
      // 清除输入框内容
      clearBorkerForm();
      // 获取数据
      getData();
    };
    //取消按钮
    const onCancel = () => {
      //取消弹框
      state.dialogVisible = false;
      //清除输入框内容
      clearBorkerForm();
    };

    // 获取数据数据
    const getData = async () => {
      let res = await getList({
        params: {
          pageIndex: state.page.currentPage,
          pageSize: state.page.pageSize,
          ...state.searchForm,
        },
      });
      state.tableData = res.data.data;
      state.page.total = res.data.total;
    };
    // 获取数据
    getData();

    // 清空弹框数据
    const clearBorkerForm = () => {
      state.borkerForm = {
        name: "", //姓名
        tel: "", //手机号
        company: "", //公司
        newHouse: "", //新房
        secondHandHouse: "", //二手房
        renting: "", //租房
        state: "", //状态
      };
    };
    return {
      ...toRefs(state),
      handleSearch,
      handleCreate,
      handleEdit,
      handleDelete,
      handleStart,
      handleStop,
      handleReset,
      onConfirm,
      onCancel,
      handleSizeChange,
      handleCurrentChange,
      clearBorkerForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.cell {
  text-align: center !important;
}
.el-table .cell {
  text-align: center;
}
.demo-pagination-block {
  display: flex;
  align-items: center;

  background: #fff;
  padding: 10px 30px 20px;
  .place {
    flex: 1;
  }
}
</style>
