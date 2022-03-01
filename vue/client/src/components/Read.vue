<!--
 * @Author: your name
 * @Date: 2021-10-25 13:52:54
 * @LastEditTime: 2021-10-30 09:15:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project_client\client\src\components\Read.vue
-->
<template>
  <div class="read_recommend_list">
    <div class="read_recommend_list_header">{{$t("article.recommended_reading")}}</div>
    <div
      class="read_recommend_list_item"
      v-for="item in readList"
      :key="item.id"
      @click="readDetails(item.id)"
    >
      <p>
        {{item.title}}
        <span class="read_recommend_span">{{filterTime(item.date)}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { getRead } from "../api/read";
import { ref } from "vue";
import { getDetails } from "../api/detail";
import { filterTime } from "../utils/times";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    let readList = ref([]);
    const route = useRoute();
    const router = useRouter();
    const get_Read = async () => {
      const res = await getRead({ pageIndex: 1, pageSize: 6 });
      readList.value = res.data.readList;
    };
    get_Read();
    const readDetails = (id) => {
      router.push("/detail/" + id);
    };
    return {
      router,
      route,
      readDetails,
      get_Read,
      readList,
      filterTime,
    };
  },
};
</script>

<style lang='scss'>
.read_recommend_list {
  overflow: hidden;
  .read_recommend_list_header {
    padding: 16px;
  }
  .read_recommend_list_item {
    padding: 10px;
    .read_recommend_span {
      font-size: 12px;
    }
    .read_recommend_span::before {
      content: "";
      display: inline-block;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      vertical-align: middle;
      background-color: #ccc;
      margin: 0 4px;
    }
  }
  .read_recommend_list_item :hover {
    color: #ff0064;
    .read_recommend_span::before {
      background-color: #ff0064;
    }
  }
}
</style>