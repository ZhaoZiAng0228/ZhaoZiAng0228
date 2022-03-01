// 聊天
<template>
  <div class="chat">
    <!-- 左侧 -->
    <div class="chat-left">
      <div class="chat-box">
        <div v-for="(item, index) in arr" :key="index" class="chat-item">
          <p>{{ item.date }}</p>
          <div :class="item.role === 'broker' ? 'left' : 'right'">
            <img
              :src="
                item.role === 'user'
                  ? 'https://img2.baidu.com/it/u=2577225513,2885519982&fm=26&fmt=auto'
                  : 'https://img0.baidu.com/it/u=325863342,1899412258&fm=26&fmt=auto'
              "
            />
            <span> {{ item.val }}</span>
          </div>
        </div>
      </div>
      <div class="ipt">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入回复的消息"
          v-model="val"
        >
        </el-input>

        <div class="btn">
          <span></span>
          <p>
            <el-button type="warning" round @click="reset"> 重置 (c)</el-button>
            <el-button type="primary" round @click="submit">
              提交 (s)</el-button
            >
          </p>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="chat-right">
      <img
        src="https://img0.baidu.com/it/u=3386740153,3129794572&fm=26&fmt=auto"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs } from "vue";
import io from "socket.io-client";
const socket = io("http://localhost:7001/homeOne");
export default {
  setup() {
    const state = reactive({
      val: "",
      arr: [],
      info: {},
      brokerInfo: {},
      brokerList: [
        {
          img:
            "https://img2.baidu.com/it/u=3018353879,684918101&fm=26&fmt=auto",
          broker: "刘诗诗",
          content: "dfajfnjoasnasnjlasldjas d",
          time: "10.16",
          address: "合计辅导费",
        },
        {
          img:
            "https://img0.baidu.com/it/u=325863342,1899412258&fm=26&fmt=auto",
          broker: "高圆圆",
          content: "电脑上接电话浓氨水到年底 d",
          time: "7.16",
          address: "就凶多吉少",
        },
      ],
    });

    //接收上线通知
    socket.on("state", async (msg) => {
      const res = await msg;
      if (res.to) {
        state.info = res;
        state.brokerInfo = state.brokerList.find(
          (item) => item.broker === res.to
        );
      }
    });

    //接收消息通知
    socket.on("res", (msg) => {
      state.arr.push(msg);
    });

    // 发送消息
    const submit = () => {
      socket.emit("chat", {
        role: "broker",
        val: state.val,
        userName: "刘诗诗",
        to: "lisi",
      });
      state.val = "";
    };

    // 重置
    const reset = () => {
      state.val = "";
    };

    return {
      ...toRefs(state),
      submit,
      reset,
    };
  },
};
</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid #ccc;
  .chat-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    .chat-box {
      flex: 1;
      overflow: auto;
      padding: 0 20px 20px 20px;
      .chat-item {
        & > p {
          text-align: center;
          margin: 15px 0;
          font-size: 14px;
        }
        .left,
        .right {
          display: flex;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
          }
          span {
            padding: 10px 12px;
          }
        }
        .left {
          /* background: #c8eaff; */
          flex-direction: row-reverse;
          span {
            margin-right: 10px;
            background: #c8eaff;
          }
        }
        .right {
          span {
            margin-left: 10px;
            background: #fff;
          }
        }
      }
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
  .chat-right {
    background: #f6f6f6;
    display: flex;
    align-items: center;
    border-left: 1px solid #ccc;

    img {
      width: 300px;
      height: 100%;
    }
  }
}
</style>
