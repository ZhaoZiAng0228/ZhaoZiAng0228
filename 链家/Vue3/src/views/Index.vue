<template>
  <el-container class="layout">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo aside"
      :collapse="isCollapse"
      :collapse-transition="false"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      text-color="#a6adb4"
      router
    >
      <div class="title">
        <div class="logo">
          <img
            :src="
              imgUrl
                ? imgUrl
                : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp7.itc.cn%2Fq_70%2Fimages03%2F20200714%2F9d51dc15266d42d993cf3e062f0f7bfc.jpeg&refer=http%3A%2F%2Fp7.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637477253&t=3aa6c5daa46f23a689a2cc1439e62e6e'
            "
            alt
            style="border-radius: 50%"
          />
          <span v-if="!isCollapse">管理后台</span>
        </div>
      </div>
      <div
        v-for="item in store.state.routerList.filter(
          (item) => item.path !== '/StreamingDetail'
        )"
        :key="item.path"
      >
        <el-menu-item :index="item.path">
          <i :class="item.meta.icon"></i>
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </div>
    </el-menu>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <i
              @click="isCollapse = !isCollapse"
              :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            ></i>
            <el-dropdown class="userInfo">
              <img
                :src="
                  imgUrl
                    ? imgUrl
                    : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp7.itc.cn%2Fq_70%2Fimages03%2F20200714%2F9d51dc15266d42d993cf3e062f0f7bfc.jpeg&refer=http%3A%2F%2Fp7.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637477253&t=3aa6c5daa46f23a689a2cc1439e62e6e'
                "
                alt
                style="border-radius: 50%"
              />
              <span>{{ user ? user : store.state.userInfo.name }}</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <!-- <el-dropdown-item>用户管理</el-dropdown-item> -->
                  <el-dropdown-item @click="exitLogin"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <!-- 面包屑 -->
        <el-breadcrumb>
          <el-breadcrumb-item>您的位置:</el-breadcrumb-item>
          <!-- :to="v.path"
						v-for="v in route.meta.title"
						:key="v" -->
          <el-breadcrumb-item>
            {{ route.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <Breadcrumb :path="route.path.value" :crumbs="route.matched.value" /> -->
      </el-card>
      <div class="con-box">
        <!-- 二级路由 -->
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const isCollapse = ref(true);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const state: any = reactive({ user: "", imgUrl: "" });
    const exitLogin = () => {
      localStorage.clear();
      store.commit("clearUserInfo", {});
      store.commit("clearRouterList", []);
      // window.location.reload();
      router.push("/LoginRegister");
    };

    const handleOpen = (key: any, keyPath: any) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: any, keyPath: any) => {
      console.log(key, keyPath);
    };

    onMounted(() => {
      const query = window.location.search.substring(1) || "";
      const name = query.split("&");
      let arr: any[] = [];
      name.forEach((item) => {
        arr.push(item.split("=")[1]);
      });
      state.imgUrl = arr[2];
      state.user = arr[1];
    });
    return {
      isCollapse,
      handleOpen,
      handleClose,
      store,
      ...toRefs(state),
      exitLogin,
      route,
      onMounted,
    };
  },
});
</script>

<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    flex-shrink: 0;
  }
  .aside {
    .el-menu-item {
      height: 50px;
    }
    .title {
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        span {
          font-size: 20px;
          color: #fff;
        }
        img {
          width: 50px;
          height: 50px;
        }
      }
      .el-dropdown {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px;
        button {
          width: 100%;
          position: relative;
          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
  .el-main {
    display: flex;
    flex-direction: column;
    padding: 0;
    .el-card__header {
      padding: 10px;
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .userInfo {
          display: flex;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            margin: 0 5px;
          }
        }
      }
    }
    .el-card__body {
      h1 {
        margin: 10px 0;
      }
    }
    .con-box {
      flex: 1;
      padding: 24px;
      overflow-y: scroll;
      background: #e7eaee;
    }
  }
}
</style>