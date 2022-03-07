/*
 * @Author: your name
 * @Date: 2022-03-05 19:03:07
 * @LastEditTime: 2022-03-06 14:48:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ZhaoZiAng0228\myapp\.umirc.ts
 */
import { defineConfig } from 'umi';

export default defineConfig({
  layout: {},
  fastRefresh: {},
  // base: '/docs/',
  // publicPath: '/static/',
  // hash: true,
  // history: {
  //   type: 'hash',
  // },
  routes: [{
    path: '/', component: '@/pages/index',
  }, {
    path: '/login', component: '@/pages/login', exact: true
  }, {
    path: '/pages/home', component: '@/pages/home',
  }, {
    path: '/pages/list', component: '@/pages/list',
  }],

});