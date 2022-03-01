<!--
 * @Author: your name
 * @Date: 2021-10-20 14:37:59
 * @LastEditTime: 2021-10-27 08:38:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \client\src\views\Home\index.vue
-->
<template>
  <div class="pigeonhole">
    <div class="pigeonhole_list">
      <div class="pigeonhole_list_head">
        <p style="color:#FF0064;fontSize:30px;">归档</p>
        <p>
          共计
          <span style="color:#FF0064;">{{total}}</span>
          篇
        </p>
      </div>
      <ul class="pigeonhole_list_body">
        <li>
          <h2>2021</h2>
        </li>
        <li>
          <h3>October</h3>
        </li>
        <li
          class="pigeonhole_list_lis"
          v-for="item in pigeonList"
          :key="item.id"
          @click="$router.push('/detail/'+item.id)"
        >
          <p>{{item.date.slice(5,10)}}</p>
          <b>{{item.title}}</b>
        </li>
      </ul>
    </div>
    <div class="read_recommend">
      <div class="read_recommend_sticky">
        <Read />
        <ArticleClassify />
      </div>
    </div>
  </div>
</template>

<script>
import { getPigeon } from "../../api/Pigeonhole";
import { ref, reactive, toRefs } from "vue";
import Read from "../../components/Read.vue";
import ArticleClassify from "../../components/ArticleClassify.vue";
export default {
  created() {
    this.get_Pigeon();
  },
  setup() {
    let pigeonList = ref([]);
    let state = reactive({
      total: "",
      Read,
      ArticleClassify,
    });
    const get_Pigeon = async () => {
      const res = await getPigeon();
      pigeonList.value = res.data.list;
      state.total = res.data.lists;
    };
    return {
      get_Pigeon,
      pigeonList,
      ...toRefs(state),
    };
  },
  components: {
    Read,
    ArticleClassify,
  },
};
</script>

<style lang='scss' scoped>
.pigeonhole {
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.pigeonhole_list {
  width: 70%;
  .pigeonhole_list_head {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 12px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .pigeonhole_list_body {
    padding: 10px;
    line-height: 50px;
    li {
      h2 {
        font-weight: 500;
        font-size: 28px;
      }
      h3 {
        font-weight: 500;
        font-size: 18px;
        padding-left: 20px;
      }
    }
  }
}
.pigeonhole_list_lis {
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 40px;
  p {
    font-size: 12px;
    color: #ccc;
    display: flex;
    align-items: center;
  }
  p::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #ccc;
    margin-right: 15px;
  }
  b {
    margin-left: 20px;
  }
}
.pigeonhole_list_lis:hover {
  color: #ff0064;
  p {
    color: #ff0064;
  }
  p::before {
    color: #ff0064;
    background-color: #ff0064;
  }
}
.pigeonhole_recommend {
  width: 320px;
  margin-top: 16px;
  .pigeonhole_recommend_list {
    .pigeonhole_recommend_list_header {
      padding: 16px;
    }
  }
  .pigeonhole_tag {
    margin-top: 10px;
    .pigeonhole_tag_header {
      padding: 16px;
    }
  }
}
.read_recommend {
  width: 320px;
  margin-top: 16px;
  .read_recommend_sticky {
    position: sticky;
    top: 84px;
  }
}
</style>