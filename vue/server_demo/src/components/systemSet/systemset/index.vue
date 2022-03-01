<!--
 * @Author: your name
 * @Date: 2021-10-15 09:20:07
 * @LastEditTime: 2021-10-15 09:34:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目（后台）\src\component\systemSet\systemset\index.vue
-->
<template>
  <div class="app">
    <div class="system">
      <li>
        系统地址
        <p><el-input /></p>
      </li>
      <li>
        后台地址
        <p><el-input /></p>
      </li>
      <li>
        系统标题
        <p><el-input /></p>
      </li>
      <li>
        Logo
        <p><el-input /></p>
      </li>
      <li>
        Favicon
        <p><el-input /></p>
      </li>
      <li>
        页脚信息
        <p>
          <el-input
            :rows="5"
            type="textarea"
          />
        </p>
      </li>
       <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.system {
  width: 100%;
  height: 100%;
  background-color: white;
  li {
    margin: 20px 0;
    .el-input {
      width: 95%;
    }
    .el-textarea__inner{
        width: 95%;
    }
  }
}
</style>