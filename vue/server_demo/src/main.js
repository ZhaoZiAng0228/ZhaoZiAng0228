import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// echarts插件
import Echarts from './components/Echart/index.vue'

// Editor编辑器组件
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import VueMarkdownEditor from '@kangc/v-md-editor';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';


// highlightjs
import hljs from 'highlight.js';
VMdEditor.use(githubTheme, {
    Hljs: hljs,
});
VueMarkdownEditor.use(createEmojiPlugin())

createApp(App).use(store).use(router).use(ElementPlus).use(VMdEditor).component('Echarts', Echarts).mount('#app')



