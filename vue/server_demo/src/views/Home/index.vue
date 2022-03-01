<!--
 * @Author: your name
 * @Date: 2021-10-12 16:41:52
 * @LastEditTime: 2021-10-12 19:47:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \day1\server_demo\src\views\Home\index.vue
-->
<template>
  <div>首页</div>
</template>

<script>
export default {
  created() {
    console.log(this.$store.state.user.name);
  },
};
</script>

<style>
</style>