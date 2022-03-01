<!--
 * @Author: your name
 * @Date: 2021-10-26 09:04:38
 * @LastEditTime: 2021-11-02 11:29:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project_client\client\src\views\Classify\index.vue
-->
<template>
  <div class="classify">
    <div class="classify_list">
      <div class="classify_list_head">
        <p>
          <span>{{$route.params.id}}</span> {{$t("article.category")}}
        </p>
        <p>
          {{$t("article.total")}}
          <span>{{pageList.length}}</span>
          {{$t("article.count")}}
        </p>
      </div>
      <div class="classify_list_item">
        <div class="item">
          <div class="item_header">
            <p
              @click="$router.push('/article')"
              :class="$route.path === '/article' ? 'active' : ''"
            >{{ $t("article.all") }}</p>
            <p
              v-for="item in classifysList"
              :key="item.id"
              @click="routeClassify(item.value)"
              :class="$route.path === '/classify/'+item.value ? 'active' : ''"
            >{{item.value}}</p>
          </div>
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
        <Tags />
      </div>
    </div>
  </div>
</template>

<script>
import { getPage, getPageClassify } from "../../api/article";
import { ref, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { filterTime } from "../../utils/times";
import Read from "../../components/Read.vue";
import Tags from "../../components/ArticleTag.vue";
export default {
  created() {
    this.get_page();
    this.classifyList();
  },
  setup() {
    let pageList = ref([]);
    let classifysList = ref([]);
    let route = useRoute();
    let router = useRouter();
    let state = reactive({
      Read,
      Tags,
    });
    const get_page = async () => {
      const res = await getPage();
      pageList.value = res.data.list.filter((item) => {
        return item.classify == route.params.id;
      });
    };
    const classifyList = async () => {
      const res = await getPageClassify();
      classifysList.value = res.data.data;
    };
    const routeClassify = (value) => {
      router.push("/classify/" + value);
      get_page();
    };
    return {
      get_page,
      pageList,
      filterTime,
      route,
      routeClassify,
      classifyList,
      classifysList,
      router,
      ...toRefs(state),
    };
  },
  components: {
    Read,
    Tags,
  },
};
</script>

<style lang='scss'>
.classify {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .classify_list {
    width: 800px;
    margin-top: 16px;

    .classify_list_head {
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
    .classify_list_item {
      margin-top: 10px;
      .item_header {
        display: flex;
        padding: 16px;
        p {
          padding: 0 12px;
          font-size: 14px;
          &.active {
            color: #ff0064;
          }
          &:hover {
            color: #ff0064;
          }
        }
      }
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