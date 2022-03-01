<!--
 * @Author: your name
 * @Date: 2021-10-21 19:13:52
 * @LastEditTime: 2021-10-27 19:15:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manager-ts\src\views\OrderForm.vue
-->
<template>
  <div class="header">
    <div class="search">
      搜素:
      <el-input
        :style="{ width: '250px' }"
        v-model="input"
        placeholder="资讯名称"
      />
    </div>
    <div class="select">
      状态:
      <el-select v-model="opt" placeholder="请选择" @change="change">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <el-button type="info" @click="search">搜素</el-button>
    <el-button type="primary" @click="addInfo">新增</el-button>
  </div>
  <el-table
    :data="data"
    :height="440"
    style="width: 100%"
    :header-cell-style="{ textAlign: 'center' }"
    :cell-style="{ textAlign: 'center' }"
  >
    <el-table-column label="序号">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="tit" label="文章标题" />
    <el-table-column prop="name" label="创建人" />
    <el-table-column prop="date" label="创建时间" />
    <el-table-column #default="scope" label="状态">
      <el-switch
        :value="!!scope.row.status"
        @change="switchChange(scope.row.id, scope.row.status)"
      />
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="page.length"
    v-model:page-size="page.pageSize"
    v-model:current-page="page.page"
    @current-change="pageChange(page.page)"
  >
  </el-pagination>
  <!-- 弹框 -->
  <el-dialog
    v-model="dialogVisible"
    title="新增编辑资讯文章"
    width="50%"
    @before-close="dialogVisible = false"
  >
    <p>姓名:<el-input v-model="info.name" placeholder="输入姓名" /></p>
    <p :style="{ margin: '10px 0' }">
      标题:<el-input v-model="info.tit" placeholder="输入标题" />
    </p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from "vue";
import {
  getInfolist,
  delInfolist,
  alterInfolist,
  addInfolist,
  editInfolist,
} from "../api/OrderApi";
export default defineComponent({
  setup() {
    const state: any = reactive({
      tableData: [],
      options: [
        {
          value: "",
          label: "请选择",
        },
        {
          value: 1,
          label: "开启",
        },
        {
          value: 0,
          label: "关闭",
        },
      ],
      input: "",
      opt: null,
      falg: false,
      info: {
        name: "",
        tit: "",
      },
      page: {
        page: 1,
        pageSize: 7,
        length: 0,
      },
      data: [],
    });
    const dialogVisible = ref(false);
    //删除
    const handleDelete = async (row: any) => {
      const id = row.id;
      console.log(id);
      const res: any = await delInfolist({ id });
      state.tableData = res.data.data;
      state.page.length = res.data.data.length;
      pageChange();
    };
    //筛选
    const change = async () => {
      console.log(state.opt);
      const status = state.opt;
      const res: any = await getInfolist({ status });
      state.tableData = res.data.data;
      state.page.length = res.data.data.length;
      pageChange();
    };
    //搜索
    const search = async () => {
      const search = state.input;
      const res: any = await getInfolist({ search });
      state.tableData = res.data.data;
      state.page.length = res.data.data.length;
      pageChange();
    };
    //开启关闭
    const switchChange = async (id: any, status: any) => {
      console.log(id, !!!status);
      const res: any = await alterInfolist({ id, status });
      getInfodata();
    };
    //新增
    const addInfo = () => {
      dialogVisible.value = true;
      state.flag = true;
    };
    //编辑
    const handleEdit = (index: any, row: any) => {
      state.flag = false;
      state.info = row;
      dialogVisible.value = true;
    };
    //弹框按钮
    const onOk = async () => {
      if (state.flag) {
        //添加
        const info = {
          ...state.info,
          date: new Date().toLocaleString(),
          status: 1,
        };
        const res: any = await addInfolist({ info });
        dialogVisible.value = false;
        state.info = {};
        getInfodata();
      } else {
        //编辑
        console.log(state.info);
        const res: any = await editInfolist({ info: state.info });
        dialogVisible.value = false;
        state.info = {};
        getInfodata();
      }
    };
    //分页
    const pageChange = () => {
      state.data = state.tableData.slice(
        (state.page.page - 1) * state.page.pageSize,
        state.page.page * state.page.pageSize
      );
    };
    //获取
    const getInfodata = async () => {
      const res: any = await getInfolist();
      state.tableData = res.data.data;
      state.page.length = res.data.data.length;
      pageChange();
    };
    getInfodata();
    return {
      ...toRefs(state),
      handleEdit,
      handleDelete,
      pageChange,
      change,
      search,
      switchChange,
      addInfo,
      onOk,
      dialogVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 10px 0;
  .search {
    margin: 0 20px;
  }
  button {
    margin-left: 20px;
  }
}
</style>