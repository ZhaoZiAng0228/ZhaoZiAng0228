<template>
  <div>
    <el-card class="box-card" style="margin-bottom: 20px">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="方式">
          <el-select v-model="searchVal.fs" placeholder="默认">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租期">
          <el-select v-model="searchVal.zq" placeholder="默认">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经纪人">
          <el-select v-model="searchVal.jjr" placeholder="默认">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn" style="display: flex; justify-content: flex-end">
        <el-button type="primary" @click="searchData">搜索</el-button>
        <el-button @click="resetData">重置</el-button>
      </div>
    </el-card>

    <!-- 新建 -->
    <div class="add">
      <div class="box">
        <!-- <div v-if="multipleSelection.length > 0"> -->
        <div>
          <el-button type="primary" v-has @click="handleBuild">新建</el-button>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      height="350"
      style="width: 100%"
    >
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="xq" label="小区" />
      <el-table-column prop="fs" label="方式" />
      <el-table-column prop="zq" label="租期" />
      <el-table-column prop="mianji" label="面积(㎡)" />
      <el-table-column prop="jiage" label="价格(元)" />
      <el-table-column prop="jjr" label="经纪人" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleCheck(scope.$index, scope.row)"
            v-if="Number(store.state.userInfo.role) === 0 ? false : true"
            >租房</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定要删除吗?"
            @confirm="confirmEvent(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="mini" type="danger" v-has>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 弹框 -->
    <el-dialog
      v-model="dialogVisible"
      title="查看编辑框"
      width="50%"
      :before-close="handleClose"
    >
      <el-form label-width="120px" class="demo-ruleForm">
        <el-form-item label="小区" prop="xq" v-if="addFlag">
          <el-input
            v-model="ruleForm.xq"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="方式">
          <el-select v-model="ruleForm.fs">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租期">
          <el-select v-model="ruleForm.zq">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格(元)" prop="jiage">
          <el-input
            v-model="ruleForm.jiage"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="changeInfo">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
// 商家账号: isjvsc4380@sandbox.com
// 商家密码: 111111
// 买家账号: dktysm4551@sandbox.com
// 登录密码: 111111
// 支付密码: 111111
import { ref, toRefs, defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "../../utils/request";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const state = reactive({
      tableData: [],
      options1: [
        {
          value: "月付",
          label: "月付",
        },
        {
          value: "季付",
          label: "季付",
        },
        {
          value: "年付",
          label: "年付",
        },
      ],
      options2: [
        {
          value: "月租",
          label: "月租",
        },
        {
          value: "一个月起租",
          label: "一个月起租",
        },
        {
          value: "1-3个月",
          label: "1-3个月",
        },
        {
          value: "4-6个月",
          label: "4-6个月",
        },
        {
          value: "年租",
          label: "年租",
        },
      ],
      options3: [
        {
          value: "叶娜",
          label: "叶娜",
        },
        {
          value: "侯霞",
          label: "侯霞",
        },
        {
          value: "姜洋",
          label: "姜洋",
        },
        {
          value: "郭丽",
          label: "郭丽",
        },
        {
          value: "贾娟",
          label: "贾娟",
        },

        {
          value: "毛杰",
          label: "毛杰",
        },
        {
          value: "史刚",
          label: "史刚",
        },
        {
          value: "方刚",
          label: "方刚",
        },
      ],
      searchVal: {
        fs: "",
        zq: "",
        jjr: "",
      },
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      ruleForm: {
        fs: "",
        zq: "",
        jiage: "",
        xq: "",
        id: "",
      },
      addFlag: false,
      action: "",
    });
    const store = useStore();
    onMounted(() => {
      getTableData();
    });
    const handleCurrentChange = (page: any) => {
      state.currentPage = page;
    };

    const handleCheck = (i: any, e: any) => {
      // state.dialogVisible = true;
      axios
        .get("/api/alipay", { params: { price: e.jiage } })
        .then((res: any) => {
          window.location.href = res.data;
        });
    };
    const handleEdit = (i: any, e: any) => {
      state.dialogVisible = true;
      state.ruleForm = { ...e };
      state.action = "编辑";
    };
    const handleBuild = () => {
      state.dialogVisible = true;
      state.action = "新建";
      state.addFlag = true;
      state.ruleForm = {
        fs: "",
        zq: "",
        jiage: "",
        id: "",
        xq: "",
      };
    };
    const changeInfo = () => {
      state.dialogVisible = false;
      if (state.action === "编辑") {
        axios
          .post("/api/manager/rent/changeinfo", {
            fs: state.ruleForm.fs,
            zq: state.ruleForm.zq,
            jiage: state.ruleForm.jiage,
            id: state.ruleForm.id,
          })
          .then((res: any) => {
            if (res.data.code === 1) {
              ElMessage({
                message: res.data.msg,
                type: "success",
              });
              setTimeout(() => {
                getTableData();
              }, 1000);
              state.ruleForm = { fs: "", zq: "", jiage: "", id: "", xq: "" };
            } else {
              ElMessage.error(res.data.msg);
            }
          });
      } else {
        // 新建
        state.addFlag = false;
        const obj = JSON.parse(JSON.stringify(state.tableData[0]));
        const newObj: any = Object.assign(obj, state.ruleForm);
        delete newObj.id;
        axios.post("/api/manager/rent/add", { newObj }).then((res: any) => {
          ElMessage({
            message: res.data.msg,
            type: "success",
          });
          setTimeout(() => {
            getTableData();
          }, 1000);
        });
      }
    };
    const searchData = () => {
      axios
        .post("/api/manager/rent/search", { ...state.searchVal })
        .then((res: any) => {
          state.tableData = res.data.data;
        });
    };
    const confirmEvent = (i: any, e: any) => {
      axios.post("/api/manager/rent/delete", { id: e.id }).then((res: any) => {
        if (res.data.code === 1) {
          ElMessage({
            message: res.data.msg,
            type: "success",
          });
          setTimeout(() => {
            getTableData();
          }, 1000);
        } else {
          ElMessage.error(res.data.msg);
        }
      });
    };
    const getTableData = () => {
      axios.get("/api/manager/rent").then((res: any) => {
        state.tableData = res.data.data;
      });
    };
    const resetData = () => {
      getTableData();
      state.searchVal = {
        fs: "",
        zq: "",
        jjr: "",
      };
    };
    return {
      ...toRefs(state),
      store,
      onMounted,
      handleCurrentChange,
      handleCheck,
      handleEdit,
      handleBuild,
      changeInfo,
      searchData,
      confirmEvent,
      getTableData,
      resetData,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>