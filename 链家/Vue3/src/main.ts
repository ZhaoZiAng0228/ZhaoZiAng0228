import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "./utils/request";
//@ts-ignore
import VideoPlayer from "vue-video-player/src";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import "videojs-contrib-hls";

const app = createApp(App);

// 全局挂载axios
app.config.globalProperties.$axios = axios;
app.directive("has", {
  // :disabled="Number(store.state.userInfo.role) === 0 ? false : true"
  // v-has="store.state.userInfo.role"
  mounted(el: any, binding: any, vnode: any) {
    let boolean = Number(binding.instance.store.state.userInfo.role);
    boolean && el.parentNode.removeChild(el);
  },
});
app.directive("zindex", {
  mounted(el: any, binding: any, vnode: any) {
    el.parentNode.style.cssText = `z-index:999; width:100%`;
  },
});

app.use(VideoPlayer);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount("#app");
