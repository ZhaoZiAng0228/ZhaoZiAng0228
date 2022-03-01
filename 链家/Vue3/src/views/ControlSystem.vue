<template>
  <!-- 审核管理 -->
  <div class="control">
    <!-- 头部 -->
    <div class="control-card">
      <div class="top">
        <!-- tab切换 -->
        <div v-for="(item, index) in tabList" :key="index">
          <el-button
            :type="item.id === ind ? 'primary' : 'info'"
            size="medium"
            style="width:120px;"
            @click="handleTab(item)"
            >{{ item.title }}</el-button
          >
        </div>
      </div>
      <!-- 搜索 -->
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <!-- 省份 -->
        <el-select
          v-model="searchForm.prov"
          style="width:167px;margin-right: 25px;"
          size="medium"
          placeholder="请选择省份"
        >
          <el-option v-for="option in arr" :value="option.name" :key="option">
            {{ option.name }}
          </el-option>
        </el-select>
        <!-- 市 -->
        <el-select
          v-model="searchForm.city"
          style="width:167px;margin-right: 25px;"
          size="medium"
          placeholder="请选择城市"
        >
          <el-option
            v-for="option in cityArr"
            :value="option.name"
            :key="option"
          >
            {{ option.name }}
          </el-option>
        </el-select>
        <!-- 区 -->
        <el-select
          v-model="searchForm.district"
          style="width:167px; margin-right: 25px;"
          size="medium"
          placeholder="请选择地区"
        >
          <el-option
            v-for="option in districtArr"
            :value="option"
            :key="option"
          >
            {{ option }}
          </el-option>
        </el-select>
        <el-input
          v-model="searchForm.val"
          placeholder="请输入关键字"
          style="width:167px; margin-right: 25px;"
        ></el-input>
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button
            type="info"
            size="medium"
            style="width:120px;"
            @click="handleReset"
            >重置</el-button
          > </el-form-item
        >、
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            style="width:120px;"
            @click="handleSearch"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体 -->
    <div class="control-box">
      <el-table
        :data="tableData"
        style="width:100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="name" label="小区名称" />
        <el-table-column
          prop="title"
          label="标题"
          width="200"
          class-name="tab-title"
          :cell-style="changeStyle"
        />
        <el-table-column prop="area" label="面积" />
        <el-table-column prop="totalPrices" label="总价" />
        <el-table-column prop="rank" label="排序" />
        <el-table-column prop="state" label="状态" width="100" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleAudit(scope.row)"
              >审核</el-button
            >
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog v-model="dialogVisible" title="编辑房源" width="35%">
      <!-- 弹框内容 -->
      <el-form :model="borkerForm">
        <!-- 小区名称 -->
        <el-form-item>
          <el-input v-model="borkerForm.name" placeholder="小区名称"></el-input>
        </el-form-item>
        <!-- 标题 -->

        <el-form-item>
          <el-input v-model="borkerForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <!-- 面积 -->
        <el-form-item>
          <el-input v-model="borkerForm.area" placeholder="面积"></el-input>
        </el-form-item>
        <!-- 总价 -->
        <el-form-item>
          <el-input
            v-model="borkerForm.totalPrices"
            placeholder="总价"
          ></el-input>
        </el-form-item>
        <!-- 排序 -->
        <el-form-item>
          <el-input v-model="borkerForm.rank" placeholder="排序"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onConfirm">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 弹框 -->
    <el-dialog v-model="dialogShow" title="审核" width="35%">
      <el-card class="box-card">
        <div class="text item">
          <b>小区名称：</b><span>{{ borkerForm.name }}</span>
        </div>
        <div class="text item">
          <b>房屋标题：</b><span>{{ borkerForm.title }}</span>
        </div>
        <div class="text item">
          <b>房屋面积：</b><span>{{ borkerForm.area }}</span>
        </div>
        <div class="text item">
          <b>房屋总价：</b><span>{{ borkerForm.totalPrices }}</span>
        </div>

        <el-select
          v-model="borkerForm.state"
          placeholder="请选择审核状态"
          style="width:100%"
        >
          <el-option label="待审核" value="待审核"></el-option>
          <el-option label="审核通过" value="审核通过"></el-option>
          <el-option label="审核未通过" value="审核未通过"></el-option>
        </el-select>
      </el-card>
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
import { defineComponent, reactive, toRefs, onMounted, watch } from "vue";
import citys from "../assets/city";
import { getList, delList, editList } from "../api/control";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  setup() {
    //   数据
    const state = reactive({
      // tab切换
      tabList: [
        { title: "全部", id: 0 },
        { title: "审核通过", id: 1 },
        { title: "审核未通过", id: 2 },
      ],
      //tab切换下标
      ind: 0,
      // 表格数据
      tableData: [],
      //   搜索框内容
      searchForm: {
        prov: "",
        city: "",
        district: "",
        val: "",
      },
      //   弹框内容
      borkerForm: {
        name: "", //小区名称
        title: "", //标题
        area: "", //面积
        totalPrices: "", //总价
        rank: "", //排序
        state: "", //状态
      },
      dialogVisible: false, //弹框显示与否
      dialogShow: false,
      // 三级联动数据
      arr: citys, //省份
      cityArr: [], //城市
      districtArr: [], //区县
      type: "全部", //类别
      // 分页
      page: {
        currentPage: 1, //当前页数
        pageSize: 5, //每页条数
        total: 20, //总条数
      },
    });

    // 改变城市
    const updateCity = () => {
      for (let i in state.arr) {
        let obj = state.arr[i];
        if (obj.name) {
          if (state.searchForm.prov === obj.name) {
            state.cityArr = obj.cityList;
          }
        }
      }
    };
    // 改变地区
    const updateDistrict = () => {
      for (var i in state.cityArr) {
        var obj = state.cityArr[i];
        if (obj.name === state.searchForm.city) {
          state.districtArr = obj.areaList;
          break;
        }
      }
    };
    //  监听
    watch(
      () => state.searchForm.prov,
      () => {
        updateCity();
        updateDistrict();
      }
    );
    watch(
      () => state.searchForm.city,
      () => {
        updateDistrict();
      }
    );

    // tab切换
    const handleTab = (item) => {
      state.ind = item.id;
      state.type = item.title;
      getData();
    };
    // 搜索
    const handleSearch = () => {
      getData();
    };

    // 重置
    const handleReset = () => {
      state.searchForm = {
        prov: "",
        city: "",
        district: "",
        val: "",
      };
      getData();
    };
    // 审核
    const handleAudit = (row) => {
      state.borkerForm = Object.assign({ ...state.borkerForm, ...row });
      state.dialogShow = true;
    };
    // 编辑
    const handleEdit = (row) => {
      state.borkerForm = Object.assign({ ...state.borkerForm, ...row });
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
    //弹框确定按钮
    const onConfirm = async () => {
      const res = await editList({ editData: state.borkerForm });
      if (res.data.code === 1) {
        ElMessage({
          message: res.data.message,
          type: "success",
        });
      }
      // 关闭弹框
      state.dialogVisible = false;
      state.dialogShow = false;
      getData();
    };
    //取消按钮
    const onCancel = () => {
      //取消弹框
      state.dialogVisible = false;
      state.dialogShow = false;
      state.borkerForm = {
        name: "", //小区名称
        title: "", //标题
        area: "", //面积
        totalPrices: "", //总价
        rank: "", //排序
        state: "", //状态
      };
    };
    // 改变每页条数
    const handleSizeChange = (val) => {
      state.page.pageSize = val;
      getData();
    };
    // 改变页码
    const handleCurrentChange = (val) => {
      state.page.currentPage = val;
      getData();
    };

    onMounted(() => {
      updateCity();
      updateDistrict();
    });

    // 获取数据数据
    const getData = async () => {
      let res = await getList({
        params: {
          pageIndex: state.page.currentPage,
          pageSize: state.page.pageSize,
          type: state.type,
          ...state.searchForm,
        },
      });
      state.tableData = res.data.data;
      state.page.total = res.data.total;
    };
    // 获取数据
    getData();
    const changeStyle = (row, column, rowIndex, columnIndex) => {
      console.log(row, column, rowIndex, columnIndex);
    };
    return {
      ...toRefs(state),
      handleTab, //tab切换
      handleSearch, //搜索
      handleReset,
      handleAudit, //审核
      handleEdit, //编辑
      handleDelete, //删除
      updateCity, //改变城市
      updateDistrict, //改变地区
      handleSizeChange, //改变每页条数
      handleCurrentChange, //改变页码
      onConfirm, //保存
      onCancel, //取消
      changeStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.control-card {
  padding: 20px 20px 0 20px;
  background: #fff;
  border-bottom: 1px solid #e1f3d8;
  .top {
    padding-bottom: 20px;
    display: flex;
    & > div {
      margin-right: 25px;
    }
  }
}
.tab-title {
  font-size: 50px;
  white-space: nowrap;
  color: red !important;
}
/* 分页 */
.demo-pagination-block {
  display: flex;
  align-items: center;

  background: #fff;
  padding: 10px 30px 20px;
  .place {
    flex: 1;
  }
}

.text {
  font-size: 14px;
}

.item {
  padding-bottom: 30px;
}

.box-card {
  width: 100%;
}
</style>
