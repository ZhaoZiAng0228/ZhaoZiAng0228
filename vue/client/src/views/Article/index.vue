<!--
 * @Author: your name
 * @Date: 2021-10-21 13:39:20
 * @LastEditTime: 2021-10-29 10:16:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \client\src\views\Article\index.vue
-->


<template>
  <div class="article">
    <div class="article_list">
      <div class="article_list_head menuBar">
        <div class="con" v-if="recommendArticles.length">
          <el-carousel class="banner" trigger="click" height="316px">
            <el-carousel-item v-for="v in recommendArticles" :key="v.id">
              <img :src="v.img" alt />
              <div class="message" @click="$router.push('/detail/' + v.id)">
                <h2 style="color: #fff">{{ v.title }}</h2>
                <p>
                  <span>{{ filterTime(v.date) }}</span>
                  <span>·</span>
                  <span>{{ v.num }}次阅读</span>
                </p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="article_list_item">
        <div class="item">
          <div class="item_header">
            <p
              @click="$router.push('/article')"
              :class="$route.path === '/article' ? 'active' : ''"
            >{{ $t("article.all") }}</p>
            <p
              v-for="item in classifysList"
              :key="item.id"
              @click="$router.push('/classify/'+item.value)"
              :class="$route.path === '/'+item.id ? 'active' : ''"
            >{{item.value}}</p>
          </div>
          <div class="items">
            <div
              class="items_box"
              v-for="item in pageList"
              :key="item.id"
              @click="$router.push('/detail/' + item.id)"
            >
              <p>
                <span>{{item.title}}</span>
                <span
                  style="color: #8590a6; border-left: 1px solid #f0f0f0"
                >{{filterTime(item.date)}}</span>
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
    <div class="read_recommend">
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
import { useRouter } from "vue-router";
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
    let router = useRouter();
    let recommendArticles = ref([]);
    let state = reactive({
      Read,
      Tags,
    });
    // 获取文章页面全部数据
    const get_page = async () => {
      const res = await getPage();
      pageList.value = res.data.list;
      // 筛选全部数据中设置首焦推荐的数据
      let newPage = res.data.list.filter((item) => {
        return item.recommend === "true";
      });
      // 筛选首焦推荐中含有图片的数据
      recommendArticles.value = newPage.filter((item) => {
        return item.img !== "";
      });
    };
    const classifyList = async () => {
      // 文章导航栏 分类数据
      const res = await getPageClassify();
      classifysList.value = res.data.data;
    };
    return {
      get_page,
      pageList,
      router,
      filterTime,
      classifyList,
      classifysList,
      recommendArticles,
      ...toRefs(state),
    };
  },
  components: {
    Read,
    Tags,
  },
};
</script>

<style lang="scss">
.article {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .article_list {
    width: 800px;
    margin-top: 82px;

    .article_list_head {
      padding: 8px;
      display: flex;
      .con {
        width: 100%;
        height: 100%;
        .banner {
          width: 100%;
          position: relative;
          img {
            width: 100%;
            height: 120%;
          }
          .message {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p {
              color: #fff;
              padding: 10px 0;
              span:nth-of-type(2) {
                margin: 0 5px;
              }
            }
          }
        }
      }
    }
    .article_list_item {
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

.read_recommend {
  width: 320px;
  margin-top: 16px;
  .read_recommend_sticky {
    position: sticky;
    top: 84px;
  }
}
</style>