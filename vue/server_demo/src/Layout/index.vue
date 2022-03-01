<!--
 * @Author: your name
 * @Date: 2021-10-12 22:17:28
 * @LastEditTime: 2021-10-22 11:13:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \day1\server_demo\src\layout\index.vue
-->
<template>
  <div class="layout">
    <el-aside width="auto">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <div class="el_title">
          <img src="../images/1.png" alt />
          <b v-if="!isCollapse">管理后台</b>
        </div>
        <el-dropdown>
          <el-button type="primary">
            <i class="el-icon-plus">
              <span v-if="!isCollapse" style="padding: 0 35px">新建</span>
            </i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="this.$router.push('/editor/?name=All')"
                >新建文章-协同编辑器</el-dropdown-item
              >
              <el-dropdown-item @click="this.$router.push('/editor/?name=All')"
                >新建文章</el-dropdown-item
              >
              <el-dropdown-item @click="this.$router.push('/editor/?name=Page')"
                >新建页面</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-radio-group>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        text-color="#a6adb4"
        style="height: 100%"
        :collapse-transition="false"
        router
      >
        <li v-for="item in list" :key="item.id">
          <el-menu-item
            v-if="!item.children"
            :index="item.path"
            @click="addRoute(item.path, item.name)"
          >
            <i :class="item.icon"></i>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
          <el-sub-menu v-if="item.children" index="2">
            <template #title>
              <i :class="item.icon"></i>
              <span v-show="!isCollapse">{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="second in item.children"
              :key="second.id"
              :index="second.path"
              @click="addRoute(second.path, second.name, item.name)"
            >
              <i :class="second.icon"></i>
              <template #title>
                {{ second.name }}
              </template>
            </el-menu-item>
          </el-sub-menu>
        </li>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header_top">
          <i
            @click="isCollapse = !isCollapse"
            :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          ></i>
          <div class="header_right">
            <img
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_381786.png&refer=http%3A%2F%2Fcdn.onlinewebfonts.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636897416&t=3e1bd04b15da2fe92554a29bf3010597"
              alt
              class="header_img"
              @click="this.$router.push('https://github.com/fantasticit/wipi')"
            />
            <img :src="$store.state.user.img" alt class="header_img" />
            <el-dropdown>
              <p>Hi!{{ this.$store.state.user.name }}</p>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="myRouter('/layout/myspace', '个人设置')"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="myRouter('/layout/user', '用户管理')"
                    >用户管理</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="myRouter('/layout/system', '系统设置')"
                    >系统设置</el-dropdown-item
                  >
                  <el-dropdown-item @click="removeToken"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="header_bottom">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/layout/workbench' }"
              >工作台</el-breadcrumb-item
            >
            <el-breadcrumb-item v-if="breadName">
              <a :href="breadPath">{{ breadName }}</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="breadSecond">
              <a :href="breadPath">{{ breadSecond }}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div
            class="header_bottom_work"
            v-if="$route.path == '/layout/workbench'"
          >
            <h2>您好，{{ this.$store.state.user.name }}</h2>
            <p>您的角色：{{ this.$store.state.user.role }}</p>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { setRoute } from "../api/layout";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      isCollapse: false,
      list: [],
      secondlist: [],
      active: 0,
      breadPath: "",
      breadSecond: "",
      breadName: "",
    };
  },
  methods: {
    async routerArr() {
      const data = await setRoute("/api/setRoute");
      this.list = data.data.list;
      this.secondlist = data.data.secondlist;
      this.list.map((i, v) => {
        if (i.userid === 1) {
          i["children"] = this.secondlist.map((val) => val);
        }
        return i;
      });
    },
    addRoute(path, name, names) {
      this.breadPath = path;
      this.breadSecond = name;
      this.breadName = names;
    },
    // 头像快捷跳转
    myRouter(path, name) {
      if (this.breadName) {
        this.breadPath = "";
        this.breadSecond = "";
        this.breadName = "";
      }
      this.$router.push(path);
      this.breadPath = path;
      this.breadSecond = name;
    },
    removeToken() {
      Cookie.remove("token");
      this.$router.push("/login");
    },
  },
  created() {
    this.routerArr();
  },
};
</script>

<style lang='scss'>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.el-menu-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.el-sub-menu__title {
  display: flex;
  align-items: center;
  padding-right: 100px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
}
.el-header {
  width: 100%;
  min-height: 100px;
  background-color: #fff;
  --el-header-height: none;
  text-align: left;
  padding: 0;
  .el-dropdown-selfdefine {
    line-height: 50px;
  }
  .header_right {
    height: 50px;
    img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}

.header_top {
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 20px;
}
.header_bottom {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  .header_bottom_work {
    margin-top: 20px;
    h2 {
      font-weight: 900;
      margin-bottom: 10px;
    }
  }
}
.el-aside {
  background-color: #001529;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  overflow-y: auto;
}
.el-menu {
  background-color: #001529;
  overflow: hidden;
}
.el-radio-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .el_title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  b {
    width: 50%;
    height: 50px;
    font-size: 14px;
    color: #fff;
    line-height: 50px;
    text-align: left;
    margin-top: 10px;
  }
  img {
    margin-top: 10px;
    width: 50px;
    height: 50px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
}

.el-menu,
.el-menu-vertical-demo,
.v-enter-to {
  overflow-y: auto;
}
.el-sub-menu__icon-arrow {
  right: 10px;
}
.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>