<!--
 * @Author: your name
 * @Date: 2021-10-15 09:20:07
 * @LastEditTime: 2021-10-15 09:59:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目（后台）\src\component\systemSet\systemset\index.vue
-->
<template>
  <div class="app">
    <div class="Smtp">
      <li>
        STMP地址
        <p><el-input /></p>
      </li>
      <li>
        STMP端口（强制使用SSL连接）
        <p><el-input /></p>
      </li>
      <li>
        STMP用户
        <p><el-input /></p>
      </li>
      <li>
        STMP密码
        <p><el-input /></p>
      </li>
      <li>
        发件人
        <p><el-input /></p>
      </li>

      <p>
        <el-button type="primary">保存</el-button>
        <el-button>测试</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.Smtp {
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