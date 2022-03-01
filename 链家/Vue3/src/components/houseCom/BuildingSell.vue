<template>
  <div>
    <el-card class="box-card" style="margin-bottom: 20px">
      <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="区域">
          <el-select v-model="searchVal.quyu" placeholder="默认">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房型">
          <el-select v-model="searchVal.fangxing" placeholder="默认">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用途">
          <el-select v-model="searchVal.yt" placeholder="默认">
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
      <el-table-column prop="name" label="楼盘名称" />
      <el-table-column prop="quyu" label="所属区域" />
      <el-table-column prop="jiage" label="价格(单位:万)" />
      <el-table-column prop="fangxing" label="房型" />
      <el-table-column prop="zx" label="装修" />
      <el-table-column prop="yt" label="用途" />
      <el-table-column label="操作">
        <template #default="scope">
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
        <el-form-item label="楼盘名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格(万元)" prop="jiage">
          <el-input
            v-model="ruleForm.jiage"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用途">
          <el-select v-model="ruleForm.yt">
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
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="changeInfo">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import {
  ref,
  toRefs,
  defineComponent,
  reactive,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import axios from "../../utils/request";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const state = reactive({
      tableData: [],
      options1: [
        {
          value: "浦东",
          label: "浦东",
        },
        {
          value: "闵行",
          label: "闵行",
        },
        {
          value: "宝山",
          label: "宝山",
        },
        {
          value: "徐汇",
          label: "徐汇",
        },
        {
          value: "普陀",
          label: "普陀",
        },
        {
          value: "杨浦",
          label: "杨浦",
        },
        {
          value: "长宁",
          label: "长宁",
        },
        {
          value: "松江",
          label: "松江",
        },
        {
          value: "嘉定",
          label: "嘉定",
        },
        {
          value: "黄浦",
          label: "黄浦",
        },
        {
          value: "静安",
          label: "静安",
        },
        {
          value: "虹口",
          label: "虹口",
        },
        {
          value: "青浦",
          label: "青浦",
        },
        {
          value: "奉贤",
          label: "奉贤",
        },
        {
          value: "金山",
          label: "金山",
        },
        {
          value: "崇明",
          label: "崇明",
        },
      ],
      options2: [
        {
          value: "一室",
          label: "一室",
        },
        {
          value: "二室",
          label: "二室",
        },
        {
          value: "三室",
          label: "三室",
        },
        {
          value: "四室",
          label: "四室",
        },
        {
          value: "五室",
          label: "五室",
        },
        {
          value: "五室以上",
          label: "五室以上",
        },
      ],
      options3: [
        {
          value: "别墅",
          label: "别墅",
        },
        {
          value: "车位",
          label: "车位",
        },
        {
          value: "四合院",
          label: "四合院",
        },
        {
          value: "商业类",
          label: "商业类",
        },
        {
          value: "普通住宅",
          label: "普通住宅",
        },
      ],
      searchVal: {
        quyu: "",
        fangxing: "",
        yt: "",
      },
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      ruleForm: {
        name: "",
        jiage: "",
        yt: "",
        id: "",
      },
      action: "",
    });
    const store = useStore();
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    // onMounted(() => {
    // 	getTableData();
    // });

    const getTableData = () => {
      axios.get("/api/manager/all").then((res: any) => {
        state.tableData = res.data.prices;
      });
    };
    getTableData();
    const handleCurrentChange = (page: any) => {
      state.currentPage = page;
    };
    const handleCheck = (e: any) => {
      state.dialogVisible = true;
    };
    const handleEdit = (i: any, e: any) => {
      state.dialogVisible = true;
      state.ruleForm = { ...e };
      state.action = "编辑";
    };
    const handleBuild = () => {
      state.dialogVisible = true;
      state.action = "新建";
      state.ruleForm = {
        name: "",
        jiage: "",
        yt: "",
        id: "",
      };
    };
    const changeInfo = () => {
      state.dialogVisible = false;
      if (state.action === "编辑") {
        axios
          .post("/api/manager/changeinfo", {
            yt: state.ruleForm.yt,
            name: state.ruleForm.name,
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
              state.ruleForm = { name: "", jiage: "", yt: "", id: "" };
            } else {
              ElMessage.error(res.data.msg);
            }
          });
      } else {
        // 新建
        const obj = JSON.parse(JSON.stringify(state.tableData[0]));
        const newObj: any = Object.assign(obj, state.ruleForm);
        delete newObj.id;
        axios.post("/api/manager/add", { newObj }).then((res: any) => {
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
        .post("/api/manager/search", { ...state.searchVal })
        .then((res: any) => {
          state.tableData = res.data.data;
        });
    };
    const confirmEvent = (i: any, e: any) => {
      console.log(e);
      axios.post("/api/manager/delete", { id: e.id }).then((res: any) => {
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
    const resetData = () => {
      getTableData();
      state.searchVal = {
        quyu: "",
        fangxing: "",
        yt: "",
      };
    };
    return {
      ...toRefs(state),
      store,
      onMounted,
      handleCurrentChange,
      handleCheck,
      handleEdit,
      changeInfo,
      getTableData,
      searchData,
      confirmEvent,
      handleBuild,
      resetData,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>