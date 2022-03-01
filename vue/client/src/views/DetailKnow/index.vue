<!--
 * @Author: your name
 * @Date: 2021-10-31 10:58:11
 * @LastEditTime: 2021-10-31 22:21:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\training-group-3\serve\src\views\DetailKnow\index.vue
-->
<template>
  <div class="detailKnow">
    <!-- 面包屑 -->
    <div class="detailknow_heade">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path:'/knowledge' }" class="knowBread">知识小册</el-breadcrumb-item>
        <el-breadcrumb-item>{{knowData.page}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 标题 -->
    <div class="detailknow_main">
      <div class="left">
        <h3>{{knowData.page}}</h3>
        <div class="detailknow_content">
          <img :src="knowData.img" alt />
          <div class="content_bottom">
            <h3>{{knowData.page}}</h3>
            <p>{{knowData.word}}</p>
            <p>
              {{knowData.pageView}}次阅读
              <span>{{knowData.date}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="know_other">
          <h3>其他知识笔记</h3>
          <div class="other_content">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getKnowList } from "../../api/knowledge";
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    let knowData = ref([]);
    const getKnow = async () => {
      let res = await getKnowList({ id: route.params.id });
      knowData.value = res.data.post;
    };
    getKnow();
    return {
      knowData,
    };
  },
};
</script>
  
  <style lang="scss">
.detailKnow {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  .detailknow_heade {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      font-weight: 200;
      color: #555;
    }
  }

  .detailknow_main {
    width: 100%;
    display: flex;
    .left {
      width: 68%;
      margin-right: 30px;
      .detailknow_content {
        width: 100%;
        height: auto;
        border: 1px solid #eee;
        img {
          width: 100%;
          height: 600px;
          padding: 10px;
        }
        .content_bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            padding: 5px 0;
          }
          span::before {
            content: "";
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #666;
            margin: 0 5px;
            vertical-align: middle;
          }
        }
      }
    }
    .right {
      flex: 1;

      .other_content {
        width: 100%;
        height: 120px;
        border: 1px solid #eee;
        text-align: center;
        line-height: 120px;
        position: sticky;
        top: 60px;
      }
    }
  }
  h3 {
    padding: 20px 0;
  }
}
</style>
  