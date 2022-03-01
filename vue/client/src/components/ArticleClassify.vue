<!--
 * @Author: your name
 * @Date: 2021-10-25 14:36:51
 * @LastEditTime: 2021-10-27 14:42:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project_client\client\src\components\ArticleTag.vue
-->
<template>
  <div class="classify_tag">
    <div class="classify_tag_list_header">{{ $t("article.category") }}</div>
    <div class="classify_tag_list_item">
      <p v-for="item in classifyList" :key="item.id" @click="$router.push('/classify/' + item.value)">
        {{item.name}}
        <span>共计{{ClassifyCount(item.value)}}篇文章</span>
      </p>
    </div>
  </div>
</template>
  
  <script>
import { getClassify } from "../api/classify";
import { ref } from "vue";
export default {
  created() {
    this.get_Tags();
  },
  setup() {
    let classifyList = ref([]);
    let allList = ref([]);
    const get_Tags = async () => {
      const res = await getClassify();
      classifyList.value = res.data.data;
      allList.value = res.data.list;
    };
    const ClassifyCount = (value) => {
      return allList.value.filter((item) => {
        return item.classify == value;
      }).length;
    };
    return {
      get_Tags,
      classifyList,
      allList,
      ClassifyCount,
    };
  },
};
</script>
  
  <style lang='scss'>
.classify_tag {
  margin-top: 10px;
  .classify_tag_list_header {
    padding: 16px;
  }
  .classify_tag_list_item {
    padding: 10px;
    display: flex;
    flex-direction: column;
    p {
      padding: 10px 5px;
      display: flex;
      color: #9c9c9c;
      justify-content: space-between;
      span {
        font-size: 14px;
      }
    }
    p:hover {
      color: #ff0064;
    }
  }
}
</style>