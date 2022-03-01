import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './css/icon.css'
import './css/bgstyle.less'
import BeforeEach from './router/BeforeEach'

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

createApp(App).use(store).use(BeforeEach).use(router).use(VMdPreview).use(i18n).use(ElementPlus).mount('#app')
