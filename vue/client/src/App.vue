<!--
 * @Author: your name
 * @Date: 2021-10-20 14:34:42
 * @LastEditTime: 2021-11-04 11:13:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \client\src\App.vue
-->
<template>
  <div class="home" @scroll="aaa">
    <div style="height: 64px">
      <header
        :class="
          showHead
            ? 'header_nav menuBorder navOff'
            : 'header_nav menuBorder navOn'
        "
      >
        <div class="header_nav_container">
          <el-dropdown v-if="Cookie.get('token')">
            <div class="user_img">
              <img :src="$store.state.user.img" alt />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="removeToken"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="user_img" v-else>
            <p @click="$router.push('/login')">{{ $t("article.login") }}</p>
          </div>
          <div class="nav_list">
            <ul class="nav_list_items">
              <li
                v-for="v in navList"
                :key="v.path"
                @click="$router.push('/' + v.path)"
                :class="$route.path === '/' + v.path ? 'active' : ''"
              >
                {{ $t(v.title) }}
              </li>
              <li v-for="v in $store.state.pageList" :key="v.id">
                {{ v.name }}
              </li>
            </ul>
            <div class="icon">
              <span>
                <el-dropdown>
                  <i class="iconfont icon-wenziqiehuan"></i>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="changeLang('en')">
                        {{ $t("header.english") }}
                      </el-dropdown-item>
                      <el-dropdown-item @click="changeLang('zh')">
                        {{ $t("header.chinese") }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </span>
              <span>
                <b class="sun" @click="changeMode(!Schema)">
                  <small
                    class="sun_items"
                    @mouseover="flag = true"
                    @mouseleave="flag = false"
                    :style="
                      Schema
                        ? 'border: 3px solid #fff'
                        : 'width:30px;height:30px;background:#E684AF;'
                    "
                  ></small>
                  <small
                    :class="Schema ? 'moon_items' : 'moon_items moons_items'"
                    @mouseover="flags = true"
                    @mouseleave="flags = false"
                    :style="
                      flags ? 'transform: scale(1) translate(20%,-45%);' : ''
                    "
                  ></small>
                  <small
                    class="sun_item"
                    v-show="Schema"
                    :style="
                      flag
                        ? 'transform: translate(-50%, -50%) rotate(30deg);'
                        : 'transform: translate(-50%, -50%) rotate(60deg);'
                    "
                  ></small>
                  <small
                    class="sun_item"
                    v-show="Schema"
                    :style="
                      flag
                        ? 'transform: translate(-50%, -50%) rotate(60deg);'
                        : 'transform: translate(-50%, -50%) rotate(90deg);'
                    "
                  ></small>
                  <small
                    class="sun_item"
                    v-show="Schema"
                    :style="
                      flag
                        ? 'transform: translate(-50%, -50%) rotate(90deg);'
                        : 'transform: translate(-50%, -50%) rotate(120deg);'
                    "
                  ></small>
                  <small
                    class="sun_item"
                    v-show="Schema"
                    :style="
                      flag
                        ? 'transform: translate(-50%, -50%) rotate(120deg);'
                        : 'transform: translate(-50%, -50%) rotate(150deg);'
                    "
                  ></small>
                  <small
                    class="sun_item"
                    v-show="Schema"
                    :style="
                      flag
                        ? 'transform: translate(-50%, -50%) rotate(150deg);'
                        : 'transform: translate(-50%, -50%) rotate(180deg);'
                    "
                  ></small>
                  <small
                    class="sun_item"
                    v-show="Schema"
                    :style="
                      flag
                        ? 'transform: translate(-50%, -50%) rotate(180deg);'
                        : 'transform: translate(-50%, -50%) rotate(210deg);'
                    "
                  ></small>
                </b>
              </span>
              <span>
                <i
                  class="iconfont icon-sousuo"
                  @click="searchIsShow = true"
                ></i>
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
    <main>
      <div class="main_container">
        <router-view></router-view>
      </div>
    </main>
    <!-- 搜索 -->
    <div class="search_history" v-if="searchIsShow">
      <div class="search_container">
        <div class="search_container_header">
          <b>{{ $t("article.search") }}</b>
          <p @click="searchIsShow = false">
            <i class="el-icon-close"></i>
            <span>esc</span>
          </p>
        </div>
        <div class="search_container_body">
          <div style="margin-top: 15px">
            <el-input
              v-model="searchInp"
              :input-style="{ border: red }"
              :placeholder="$t('article.searchPlaceholder')"
            >
              <template #append>
                <el-button
                  icon="el-icon-search"
                  @click="getSearchs"
                ></el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="search_container_foot">
          <li
            v-for="item in searchList"
            :key="item.id"
            @click="searchDetail(item.id)"
          >
            {{ item.title }}
          </li>
        </div>
      </div>
    </div>
    <el-backtop target=".home" :visibility-height="60"></el-backtop>
  </div>
</template>
<script>
//切换中英文mixin
import { myChangeLangMiXin, styleMixin } from "./miXin/index";
import { searchHisory } from "./api/search";
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Cookie from "js-cookie";
export default {
  mixins: [myChangeLangMiXin, styleMixin],
  setup() {
    //变量//
    let store = useStore();
    let flag = ref(false);
    let flags = ref(false);
    let Schema = ref(true);
    let showHead = ref(false);
    let searchIsShow = ref(false);
    let searchList = ref([]);
    let router = useRouter();
    let searchInp = ref("");
    let top = ref();
    let navList = reactive([
      {
        title: "header.article",
        path: "article",
      },
      {
        title: "header.pigeonhole",
        path: "pigeonhole",
      },
      {
        title: "header.knowledge",
        path: "knowledge",
      },
      {
        title: "header.webSocket",
        path: "websocket",
      },
    ]);
    //方法//
    //切换主题
    const changeMode = (boolean) => {
      Schema.value = boolean;
      styleModeChange(!window.nightModeStyle);
    };
    // 模糊搜索
    const getSearchs = async () => {
      let res = await searchHisory(searchInp.value);
      searchList.value = res.data.userSearchList;
    };
    // 模糊搜索数据点击跳转详情页
    const searchDetail = (id) => {
      router.push("/detail/" + id);
      searchIsShow.value = false;
    };
    // 盒子滚动事件
    const aaa = (e) => {
      top.value = e.target.scrollTop;
    };
    // 监听
    watch(top, (newTop, oldTop) => {
      if (newTop > oldTop) {
        showHead.value = true;
      } else {
        showHead.value = false;
      }
    });
    //退出登录
    const removeToken = () => {
      Cookie.remove("token");
      sessionStorage.removeItem("vuex");
      // location.reload();
    };
    return {
      flag,
      showHead,
      searchList,
      flags,
      top,
      Schema,
      aaa,
      getSearchs,
      searchIsShow,
      searchDetail,
      searchInp,
      navList,
      router,
      store,
      Cookie,
      removeToken,
      changeMode,
    };
  },
};
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  user-select: none;
  h1::-moz-selection {
    background: #ff0064;
    color: #fff;
  }
  h1::selection {
    background: #ff0064;
    color: #fff;
  }
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}

.home {
  overflow-y: auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  .navOn {
    position: fixed;
    top: 0;
    left: 0;
    transition: all ease-in-out 0.2s;
    transform: translateY(0);
    z-index: 999;
  }
  .navOff {
    position: fixed;
    top: 0;
    left: 0;
    transition: all  ease-in-out 0.2s;
    transform: translateY(-100%);
    z-index: 999;
  }
  .header_nav {
    width: 100%;
    height: 64px;
    .header_nav_container {
      width: 1140px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      .el-dropdown {
        display: flex;
      }
      .user_img {
        display: flex;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
          margin-right: 4rem;
        }
      }
      .nav_list {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .nav_list_items {
          display: flex;
          li {
            padding: 0 20px;
            &.active {
              color: #ff0064;
            }
            &:hover {
              color: #ff0064;
            }
          }
        }
        .icon {
          display: flex;
          span {
            padding: 0 24px;
            i {
              font-size: 24px;
            }
          }
          .sun {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            position: relative;
            .sun_items {
              position: absolute;
              width: 20px;
              height: 20px;
              background: #eec413;

              border-radius: 50%;
              top: 50%;
              left: 50%;
              z-index: 999;
              transform: scale(1) translate(-50%, -50%);
            }
            .moon_items {
              z-index: 999;
              position: absolute;
              border-radius: 50%;
              top: 0;
              right: 0;
              transform: scale(0) translate(-100%, 35%);
              transition: transform 0.4s;
              transform-origin: right;
            }
            .moons_items {
              height: 28px;
              width: 28px;
              transform: scale(1) translate(30%, -40%);
              background-color: #282c35;
            }
            .sun_item {
              position: absolute;
              width: 30px;
              height: 2px;
              background: #eec413;
              top: 50%;
              left: 50%;
              transition: all 0.4s, height 0.3s ease-in-out;
            }
          }
        }
      }
    }
  }

  main {
    flex: 1;
    .main_container {
      width: 1140px;
      margin: 0 auto;
    }
  }
}
// 搜索页面
.search_history {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  background-color: #fff;
  align-items: flex-start;
  padding: 50px 0;
  display: flex;
  justify-content: center;
}
.search_container {
  width: 70%;
  .search_container_header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    b {
      font-size: 30px;
      display: flex;
      align-items: center;
    }
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-icon-close {
        font-size: 35px;
        color: #a6a6a6;
      }
      span {
        font-size: 20px;
        color: #a6a6a6;
      }
    }
  }
  .search_container_body {
    width: 100%;
    .el-input__inner {
      height: 45px;
      &:hover {
        border: 1px solid #ff0064;
      }
    }
    .el-button--default:hover {
      border: 1px solid #ff0064;
    }
  }
  .search_container_foot {
    width: 100%;
    display: flex;
    flex-direction: column;
    li {
      padding: 10px 10px;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
/*  滚动条整体部分样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 2px;
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background: #ccc;
}
</style>
