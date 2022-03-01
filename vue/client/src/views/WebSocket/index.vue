<!--
 * @Author: your name
 * @Date: 2021-11-02 14:26:29
 * @LastEditTime: 2021-11-04 11:26:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project_client\client\src\views\WebSocket\index.vue
-->
<template>
  <div class="chat">
    <div class="chat-left">
      <div class="chat-box" id="uls"></div>
      <div class="ipt">
        <el-input type="textarea" :rows="4" placeholder="请输入回复的消息" v-model="val"></el-input>
        <div class="btn">
          <span></span>
          <p>
            <el-button type="warning" round @click="reset">重置 (c)</el-button>
            <el-button type="primary" round @click="submit">提交 (s)</el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ws = new WebSocket("ws://47.100.123.89:9999");
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    let val = ref("");
    let store = useStore();
    // let arr = ref([]);
    // 连接的时候触发
    ws.onopen = function (scoket) {
      console.log(ws);
      if (ws.readyState === 1) {
        console.log("连接成功");
      }
    };

    ws.onmessage = function (msg) {
      let p = document.createElement("P");
      p.innerHTML = `<span>江东说的：${msg.data}</span>`;
      uls.appendChild(p);
    };

    const submit = function () {
      let li = document.createElement("LI");
      li.innerHTML = `<span>${store.state.user.name}说的：${val.value}</span> `;
      uls.appendChild(li);
      ws.send(val.value);
      val.value = "";
    };
    const reset = function () {
      val.value = "";
    };
    return {
      submit,
      val,
      reset,
    };
  },
};
</script>

<style lang='scss'>
.chat {
  width: 100%;
  height: 600px;
  display: flex;
  margin-top: 62px;
  border: 1px solid #ccc;
  .chat-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    .chat-box {
      flex: 1;
      overflow: auto;
      padding: 0 20px 20px 20px;
      background: url(../../images/注册.jpg) no-repeat;
      background-size: 100% 100%;
      & > p {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: left;
        color: #000;
        span {
          padding: 5px 20px;
          background-color: skyblue;
          border-radius: 5px;
        }
      }
      & > li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: right;
        color: #fff;
        span {
          padding: 5px 20px;
          border-radius: 5px;
          background-color: brown;
        }
      }
    }
    .el-textarea__inner {
      border: none;
      border-top: 1px solid #ccc;
    }
    .ipt {
      .btn {
        display: flex;
        justify-content: space-between;
        p {
          padding: 10px 0;
          margin-right: 12px;
          .el-button--small,
          .el-textarea__inner {
            font-size: 14px;
          }
          .el-button--small.is-round {
            padding: 9px 25px;
          }
        }
      }
    }
  }
}
</style>