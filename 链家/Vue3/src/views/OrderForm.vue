<!--
 * @Author: your name
 * @Date: 2021-10-21 19:13:52
 * @LastEditTime: 2021-10-27 21:15:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manager-ts\src\views\OrderForm.vue
-->
<template>
  <div class="header">
    <div class="select">
      订单类型:
      <el-select v-model="opt" placeholder="选择订单类型" @change="change">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="search">
      搜索:
      <el-input
        :style="{ width: '250px' }"
        v-model="input"
        placeholder="搜索用户名/订单编号/手机号"
      />
    </div>
    <el-button type="primary" @click="search">搜素</el-button>
  </div>
  <el-table
    :data="data"
    :height="440"
    style="width: 100%"
    :header-cell-style="{
      textAlign: 'center',
    }"
    :cell-style="{
      textAlign: 'center',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordBreak: 'break-all',
    }"
  >
    <el-table-column label="序号">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="serial" label="编号" />
    <el-table-column class="text" prop="username" label="用户名" />
    <el-table-column prop="tel" label="手机号" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="price" label="支付金额" />
    <el-table-column prop="date" label="支付时间" />
    <el-table-column label="操作">
      <template #default="scope">
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
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { getOrderdata, delOrderdata } from "../api/OrderApi";
export default defineComponent({
  setup() {
    const state: any = reactive({
      tableData: [],
      options: [
        {
          value: "",
          label: "全部类型",
        },
        {
          value: "房屋出租",
          label: "房屋出租",
        },
        {
          value: "我想买个房",
          label: "我想买个房",
        },
        {
          value: "垃圾房产",
          label: "垃圾房产",
        },
        {
          value: "新楼盘",
          label: "新楼盘",
        },
        {
          value: "二手房",
          label: "二手房",
        },
      ],
      page: {
        page: 1,
        pageSize: 7,
        length: 0,
      },
      input: "",
      opt: "",
      data: [],
    });

    //删除
    const handleDelete = async (row: any) => {
      const _id = row.id;
      const res: any = await delOrderdata({ _id });
      state.tableData = res.data.data;
      state.page.length = res.data.data.length;
      pageChange();
    };
    //筛选
    const change = async () => {
      const res: any = await getOrderdata({ type: state.opt });
      state.tableData = res.data.data;
      state.page.length = res.data.data.length;
      pageChange();
    };
    //搜索
    const search = async () => {
      const res: any = await getOrderdata({ search: state.input });
      state.tableData = res.data.data;

      state.page.length = res.data.data.length;
      pageChange();
    };
    //分页
    const pageChange = () => {
      state.data = state.tableData.slice(
        (state.page.page - 1) * state.page.pageSize,
        state.page.page * state.page.pageSize
      );
    };

    const getdata = async () => {
      const res: any = await getOrderdata();
      state.tableData = res.data.data;
      state.page.length = res.data.data.length;
      console.log(res.data.data.length);
      pageChange();
    };

    getdata();

    return {
      ...toRefs(state),
      handleDelete,
      change,
      search,
      pageChange,
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
}
.text {
  color: red !important;
  box-sizing: border-box;
  white-space: none !important;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>