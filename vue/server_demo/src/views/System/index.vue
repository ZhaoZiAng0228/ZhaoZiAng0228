<!--
 * @Author: your name
 * @Date: 2021-10-14 14:44:54
 * @LastEditTime: 2021-10-15 23:12:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \admin\src\views\Home\Set\index.vue
-->
<template>
  <div class="app">
    <div class="setting">
      <el-tabs :tab-position="tabPosition" style="height: 100%">
        <!-- 系统设置 -->
        <el-tab-pane label="系统设置">
          <System />
        </el-tab-pane>
        <!-- 国际化设置 -->
        <el-tab-pane label="国际化设置">
          <Internation />
        </el-tab-pane>
        <!-- SEO设置 -->
        <el-tab-pane label="SEO设置">
          <Eso />
        </el-tab-pane>
        <!-- 数据统计 -->
        <el-tab-pane label="数据统计">
          <Data />
        </el-tab-pane>
        <!-- OSS设置 -->
        <el-tab-pane label="OSS设置">
          <Oss />
        </el-tab-pane>
        <!-- STMP设置 -->
        <el-tab-pane label="SMTP设置">
          <Smtp />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import System from "../../components/systemSet/systemset";
import Internation from "../../components/systemSet/internation";
import Eso from "../../components/systemSet/SEO";
import Data from "../../components/systemSet/data";
import Oss from "../../components/systemSet/OSS";
import Smtp from "../../components/systemSet/SMTP";
export default {
  data() {
    return {
      tabPosition: "left",
    };
  },
  components: {
    System,
    Internation,
    Eso,
    Data,
    Oss,
    Smtp,
  },
};
</script>

<style lang="scss">
.setting {
  width: 100%;
  height: 100%;
  background-color: white;
  .el-tabs__item {
    height: 80px;
    font-size: 16px;
  }
}
</style>