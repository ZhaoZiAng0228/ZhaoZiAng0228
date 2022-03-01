<!--
 * @Author: your name
 * @Date: 2021-10-26 09:04:38
 * @LastEditTime: 2021-10-28 22:07:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project_client\client\src\views\Classify\index.vue
-->
<template>
  <div class="tag">
    <div class="tag_list">
      <div class="tag_list_head">
        <p>
          {{$t("article.about")}}
          <span>{{$route.params.id}}</span>
          {{$t("article.tagAbout")}}
        </p>
        <p>
          {{$t("article.total")}}
          <span>{{pageList.length}}</span>
          {{$t("article.count")}}
        </p>
      </div>
      <div class="tag_list_body">
        <b>{{$t("article.tags")}}</b>
        <p>
          <span
            v-for="item in tagsList"
            :key="item.id"
            @click="routePageTags(item.value)"
            :class="$route.path === '/tag/'+item.value ? 'active' : ''"
          >{{item.value}} [{{tagsCount(item.value)}}]</span>
        </p>
      </div>
      <div class="tag_list_item">
        <div class="item">
          <div class="item_header"></div>
          <div class="items">
            <div
              class="items_box"
              v-for="item in pageList"
              :key="item.id"
              @click="$router.push('/detail/'+item.id)"
            >
              <p>
                <span>{{item.title}}</span>
                <span
                  style="color: #8590a6; border-left: 1px solid #f0f0f0"
                >{{filterTime(item.date)}} | {{$route.params.id}}</span>
              </p>
              <p>
                <span v-if="false">
                  <img src alt />
                </span>
                <span>
                  <i class="iconfont icon-kongxin"></i>
                  {{item.love}}
                </span>
                <span>·</span>
                <span>
                  <i class="iconfont icon-yanjing"></i>
                  {{item.num}}
                </span>
                <span>·</span>
                <span>
                  <i class="iconfont icon-fenxiang"></i>
                  {{ $t("article.share") }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="classify_recommend">
      <div class="read_recommend_sticky">
        <Read />
        <ArticleClassify />
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getPage, getPageTags } from "../../api/article";
import { ref, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { filterTime } from "../../utils/times";
import Read from "../../components/Read.vue";
import ArticleClassify from "../../components/ArticleClassify.vue";
export default {
  created() {
    this.get_page();
    this.pageTagsList();
  },
  setup() {
    let pageList = ref([]);
    let tagsList = ref([]);
    let route = useRoute();
    let tagNum = ref([]);
    let router = useRouter();
    let state = reactive({
      Read,
      ArticleClassify,
    });
    const get_page = async () => {
      const res = await getPage();
      pageList.value = res.data.list.filter((item) => {
        return item.tag.includes(route.params.id);
      });
    };
    const pageTagsList = async () => {
      const res = await getPageTags();
      tagsList.value = res.data.data;
      tagNum.value = res.data.list;
    };
    const routePageTags = (value) => {
      router.push("/tag/" + value);
      get_page();
    };
    const tagsCount = (value) => {
      return tagNum.value.filter((item) => {
        return item.tag.split(",").includes(value);
      }).length;
    };
    return {
      get_page,
      pageList,
      filterTime,
      route,
      tagsCount,
      routePageTags,
      tagsList,
      pageTagsList,
      router,
      ...toRefs(state),
    };
  },
  components: {
    Read,
    ArticleClassify,
  },
};
</script>
  
  <style lang='scss'>
.tag {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .tag_list {
    width: 800px;
    margin-top: 82px;

    .tag_list_head {
      padding: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        padding: 10px;
        span {
          font-size: 26px;
          color: #ff0064;
        }
      }
    }
    .tag_list_body {
      margin-top: 10px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      b {
        padding: 15px 0 15px 10px;
        width: 100%;
        border-bottom: 1px solid #ccc;
      }
      p {
        padding: 20px 0 20px 10px;
        width: 100%;
        span {
          padding: 5px 10px;
          color: #ccc;
          margin-right: 10px;
          border: 1px solid #ccc;
          &.active {
            color: #fff;
            background-color: #ff0064;
          }
          &.active:hover {
            color: #fff;
            background-color: #ff0064;
          }
          &:hover {
            color: #ff0064;
            background-color: #fff;
            border: 1px solid #ff0064;
          }
        }
      }
    }
    .tag_list_item {
      margin-top: 10px;

      .items {
        padding: 10px;
        .items_box {
          padding: 10px 0;
          &:hover {
            p:nth-of-type(1) {
              span:nth-of-type(1) {
                color: #ff0064;
              }
            }
          }
          p {
            padding: 10px 0;
            &:nth-of-type(1) {
              span:nth-of-type(1) {
                font-weight: bolder;
              }
            }
            &:nth-child(2) {
              color: #8590a6;
              img {
                width: 190px;
                height: 100px;
              }
            }
            span {
              padding: 0 6px;
            }
          }
        }
      }
    }
  }
}
.classify_recommend {
  width: 320px;
  margin-top: 16px;
  .read_recommend_sticky {
    position: sticky;
    top: 84px;
  }
}
</style>