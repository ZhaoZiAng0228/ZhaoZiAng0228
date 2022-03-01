<!--
 * @Author: your name
 * @Date: 2021-10-21 13:39:20
 * @LastEditTime: 2021-10-31 22:14:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \client\src\views\knowledge\index.vue
-->


<template>
  <div class="knowledge">
    <div class="knowledge_list">
      <div class="knowledge_list_item">
        <div
          class="item"
          v-for="item in knowList"
          :key="item.id"
          @click="$router.push('/detailKnow/'+item.id)"
        >
          <p>
            <span>{{item.page}}</span>
            <span style="color: #8590a6; border-left: 1px solid #f0f0f0">{{filterTime(item.date)}}</span>
          </p>
          <div class="container">
            <div class="cover">
              <img :src="item.img" alt />
            </div>
            <div class="content">
              <div class="heade">{{item.word}}</div>
              <div class="footer">
                <span>
                  <i class="iconfont icon-yanjing"></i> 76
                </span>
                <span>·</span>
                <span>
                  <i class="iconfont icon-fenxiang"></i>
                  {{ $t("article.share") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { getKnow } from "../../api/knowledge";
import { ref, reactive, toRefs } from "vue";
import { filterTime } from "../../utils/times";
import Read from "../../components/Read.vue";
import ArticleClassify from "../../components/ArticleClassify.vue";
export default {
  created() {
    this.get_page();
  },
  setup() {
    let knowList = ref([]);
    let state = reactive({
      filterTime,
    });
    const get_page = async () => {
      const res = await getKnow();
      knowList.value = res.data.list;
    };
    return {
      get_page,
      knowList,
      ...toRefs(state),
    };
  },
  components: {
    Read,
    ArticleClassify,
  },
};
</script>
  
  <style lang="scss">
.knowledge {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .knowledge_list {
    width: 800px;
    margin-top: 16px;
    .knowledge_list_item {
      padding: 10px;
      .item {
        border-bottom: 1px solid #f0f0f0;
        padding: 10px 0;
        &:hover {
          p {
            span:nth-of-type(1) {
              color: #ff0064;
            }
          }
        }
        p {
          padding: 10px 0;
          span:nth-of-type(1) {
            font-weight: bolder;
          }

          span {
            padding: 0 6px;
          }
        }
        .container {
          display: flex;
          .cover {
            padding-right: 10px;
            img {
              width: 190px;
              height: 100px;
            }
          }
          .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .footer {
              span {
                padding: 0 5px;
              }
            }
          }
        }
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
}
</style>