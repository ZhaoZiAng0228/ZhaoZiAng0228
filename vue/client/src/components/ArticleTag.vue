<!--
 * @Author: your name
 * @Date: 2021-10-25 14:36:51
 * @LastEditTime: 2021-10-26 10:08:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project_client\client\src\components\ArticleTag.vue
-->
<template>
  <div class="read_tag">
    <div class="read_tag_list_header">{{ $t("article.tags") }}</div>
    <div class="read_tag_list_item">
      <span v-for="item in tagsList" :key="item.id" @click="$router.push('/tag/' + item.value)">{{item.value}} [{{tagsCount(item.value)}}]</span>
    </div>
  </div>
</template>

<script>
import { getTags } from "../api/tags";
import { ref } from "vue";
export default {
  created() {
    this.get_Tags();
  },
  setup() {
    let tagsList = ref([]);
    let tagNum = ref([]);
    const get_Tags = async () => {
      const res = await getTags();
      tagsList.value = res.data.data;
      tagNum.value = res.data.list;
    };
    const tagsCount = (value) => { 
      return tagNum.value.filter((item) => {
        return item.tag.split(",").includes(value)
      }).length
    };
    return {
      get_Tags,
      tagNum,
      tagsCount,
      tagsList,
    };
  },
};
</script>

<style lang='scss'>
.read_tag {
  margin-top: 10px;
  .read_tag_list_header {
    padding: 16px;
  }
  .read_tag_list_item {
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    span {
      padding: 3px 10px;
      border: 1px solid #9c9c9c;
      margin: 5px 5px;
      color: #9c9c9c;
      font-weight: 100;
    }
    span:hover {
      color: #ff0064;
      border: 1px solid #ff0064;
    }
  }
}
</style>