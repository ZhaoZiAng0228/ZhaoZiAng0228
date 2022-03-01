<!--
 * @Author: your name
 * @Date: 2021-10-15 09:20:07
 * @LastEditTime: 2021-10-15 09:54:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目（后台）\src\component\systemSet\systemset\index.vue
-->
<template>
  <div class="app">
    <div class="Data">
      <li>
        百度统计
        <p><el-input /></p>
      </li>
      <li>
        谷歌分析
        <p><el-input /></p>
      </li>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.Data {
  width: 100%;
  height: 100%;
  background-color: white;
  li {
    margin: 20px 0;
    .el-input {
      width: 95%;
    }
  }
}
</style>