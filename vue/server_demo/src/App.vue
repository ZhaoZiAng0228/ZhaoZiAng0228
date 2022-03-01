<!--
 * @Author: your name
 * @Date: 2021-10-12 13:48:32
 * @LastEditTime: 2021-10-22 10:56:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \新建文件夹 (2)\server_demo\src\App.vue
-->
<template>
  <div id="public">
    <!-- <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>-->
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
// body {
//   font-family: "Montserrat", sans-serif;
//   text-rendering: optimizeLegibility;
//   -webkit-font-smoothing: antialiased;
// }
#public {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  user-select: none;
  text-decoration: none;
  box-sizing: border-box;
}
/*  滚动条整体部分样式 */
::-webkit-scrollbar {
  width: 2px;
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background: #ccc;
}
</style>
