<template>
  <div class="demo">
    <div class="player">
      <!-- <div class="buffer">1111</div> -->

      <vue-danmaku
        ref="danmaku"
        :danmus="danmus"
        useSlot
        show
        :speeds="100"
        :debounce="500"
        loop
        :channels="5"
      >
        <!-- 弹幕插槽 -->
        <template v-slot:dm="{ danmu }">
          <div style="zindex: 999" class="aaaa" v-zindex>
            <span class="rccc"
              ><img :src="danmu.avatar" alt="" /><span
                :style="{ marginLeft: '10px' }"
              >
                {{ danmu.name }}</span
              >:<span :style="{ marginLeft: '10px' }">{{
                danmu.text
              }}</span></span
            >
            <!-- {{ danmu.name }} -->
          </div>
        </template>
        <!-- 容器插槽 -->
        <div>
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
          >
          </video-player>
        </div>
      </vue-danmaku>
    </div>

    <div class="room">
      <div class="room_parent">
        <div class="test_box" v-if="giftAnimation">
          <img
            v-if="showGiftList.length"
            :src="showGiftList[0].giftImage"
            alt=""
          />
          你赠送{{
            showGiftList.length
              ? showGiftList[0].liveGiftName + "X" + showGiftList.length
              : ""
          }}
        </div>
        <!-- 
        <h1>当前排队的礼物长度{{ showGiftList.length }}</h1> -->

        <div class="main">
          <ul>
            <li v-for="(item, index) in barrageList" :key="index">
              <span class="IMG"
                ><img
                  src="https://img0.baidu.com/it/u=1469525697,2186515336&fm=26&fmt=auto"
                  alt=""
                />乔碧萝殿下</span
              >:
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="btn_box">
          <div>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <el-button @click="sendbarrageList">发送</el-button>
            <el-button @click="toggle">礼物</el-button>
          </div>
          <div v-if="flage">
            <dl
              v-for="(item, itemI) in allList"
              :key="itemI"
              @click="sendparent(itemI)"
            >
              <dt><img :src="item.giftImage" alt="" /></dt>

              <dd>{{ item.liveGiftName }}</dd>
            </dl>
          </div>

          <div v-else></div>

          <!-- <div>
            <button @click="giftParams.giftNum = 1">按钮×1</button>
            <button @click="giftParams.giftNum = 2">按钮×2</button>
            <button @click="giftParams.giftNum = 3">按钮×3</button>
          </div> -->
          <!-- <div @click="sendGift" class="mt50">发送</div> -->
          <!-- giftParams.giftIndex = itemI -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick, onMounted, ref } from "vue";
//@ts-ignore
import vueDanmaku from "vue3-danmaku";
import Png from "../assets/img/111.png";
export default {
  components: {
    vueDanmaku,
  },
  setup() {
    // const danmus = [
    //   {
    //     avatar:
    //       "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-a54b20d6a8e33939ac7272f082869e3f_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637492924&t=5a2aef36ff9476b05e8927ad8374c878",
    //     name: "a",
    //     text: "aaa",
    //   },
    //   {
    //     avatar:
    //       "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-a54b20d6a8e33939ac7272f082869e3f_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637492924&t=5a2aef36ff9476b05e8927ad8374c878",
    //     name: "b",
    //     text: "bbb",
    //   },
    // ];
    // const danmaku = ref < any > null;
    const state = reactive({
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在                          计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL", // 类型
            src: "http://cctvtxyh5ca.liveplay.myqcloud.com/live/xinkedongman_2/index.m3u8", // url地址
          },
        ],
        hls: true,
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      danmus: [
        {
          avatar:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-a54b20d6a8e33939ac7272f082869e3f_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637492924&t=5a2aef36ff9476b05e8927ad8374c878",
          name: "昂桑",
          text: "我喜欢乔碧萝",
        },
        {
          avatar:
            "https://img0.baidu.com/it/u=1114152776,2235062641&fm=26&fmt=auto",
          name: "铁锅炖大鹅",
          text: "哈哈哈",
        },
        {
          avatar:
            "https://img1.baidu.com/it/u=1493125452,4008446532&fm=26&fmt=auto",
          name: "源氏",
          text: "竜神の剣を喰らえ",
        },
        {
          avatar:
            "https://img2.baidu.com/it/u=3263898164,905083577&fm=26&fmt=auto",
          name: "Hanzo",
          text: "竜が我が敌を喰らう！ オオカミよ、我が敌を喰らえ",
        },
        {
          avatar:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F62b48a02664575e1a02ffb4085370f400fdea32c.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638001951&t=899378c284b30932817b4289658d48cc",
          name: "萨满",
          text: "兽人永不为奴",
        },
      ],

      danmuslist: [],
      // 礼物数据
      allList: [
        //总的礼物列表
        {
          giftImage:
            "https://rdimg.rundejy.com/web/runde_admin/icon_奖杯-1.png",
          liveGiftName: "奖杯",
        },
        {
          giftImage:
            "https://rdimg.rundejy.com/web/runde_admin/icon_鼓掌-1.png",
          liveGiftName: "鼓掌",
        },
        {
          giftImage: Png,

          liveGiftName: "火箭",
        },
      ],
      showGiftList: [], // 弹层礼物列表  // '礼物1','礼物2'
      giftAnimation: false, // 是否显示礼物动画
      giftParams: {
        giftIndex: "", // 点击的是礼物列表的第几个
        giftNum: 1, // x1x2x3
        giftTime: 2000, // css里的animation mymove也是一样2s
      },

      input: "",

      flage: false,

      msg: "Hello vue-baberrage",
      barrageIsShow: true,
      currentId: 0,
      barrageLoop: false,
      barrageList: [],
    });

    const sendGift = () => {
      // 选择x1x2x3拼接数组 或者是监听礼物接口的回调数据拼接进showGiftList
      for (let i = 1; i <= state.giftParams.giftNum; i++) {
        let activeItem = state.allList[state.giftParams.giftIndex];
        state.showGiftList.unshift(activeItem);
      }

      nextTick(() => {
        if (!state.giftAnimation) {
          // 动画已经停止了 点了新的礼物 执行新的定时器
          state.giftAnimation = true;
          let giftAnimationtime = setInterval(() => {
            if (state.showGiftList.length === 1) {
              // 最后一个数组 也是要停止定时器
              state.showGiftList.shift();
              clearInterval(giftAnimationtime);
              state.giftAnimation = false;
            } else if (state.showGiftList.length) {
              // 有长度的话 就必须要删除数组
              state.showGiftList.shift();
            } else {
              //  没有数组的时候 就要停止定时器
              clearInterval(giftAnimationtime);
              giftAnimation = false;
            }
          }, state.giftParams.giftTime);
        } else {
        } // 正在进行动画的话 就不再添加定时器
      });
    };
    let danmaku = ref(null);

    const toggle = () => {
      state.flage = !state.flage;
    };

    const sendparent = (itemI) => {
      state.giftParams.giftIndex = itemI;

      sendGift();
    };

    const sendbarrageList = () => {
      if (state.input != "") {
        state.barrageList.push(state.input);

        danmaku.value.push({
          avatar:
            "https://img0.baidu.com/it/u=1469525697,2186515336&fm=26&fmt=auto",
          name: "乔碧萝殿下",
          text: state.input,
        });
      }

      console.log(state.danmuslist);
      state.input = "";
    };

    return {
      ...toRefs(state),
      sendGift,
      sendparent,
      toggle,
      sendbarrageList,
      danmaku,
    };
  },
};
</script>

<style lang="scss" scoped>
.demo {
  width: 100%;
  height: 100%;
  /* position: relative; */
  /* display: flex; */
}

.player {
  width: 75%;
  height: 100%;
  /* position: absolute; */
  float: left;
  position: relative;
  color: #fff;

  .rccc {
    width: 20px;
    height: 20px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .buffer {
    position: absolute;
    right: -100px;
    top: 60px;
    color: #cccc;
    animation: rmove 2s infinite;
  }
}

.vue-danmaku .danmus {
  z-index: 999 !important;
}
@keyframes rmove {
  0% {
    right: -100px;
    display: none;
  }
  1% {
    right: -160px;
    display: block;
  }
  50% {
    right: -200px;
  }
  99% {
    right: -200px;
  }
  100% {
    right: -200px;
    display: none;
  }
}
.room {
  width: 25%;
  height: 600px;
  background: #fcfcfc;
  /* position: absolute; */
  float: right;
}

.video-js .vjs-icon-placeholder .vjs-custom-skin {
  width: 100%;
  height: 100%;
}

.mt50 {
  margin-top: 50px;
}
.room_parent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    overflow-y: scroll;
    overflow: hidden;
    position: relative;

    > ul {
      position: absolute;
      width: 100%;
      overflow-y: scroll;
      bottom: 0px;
      /* overflow: hidden; */

      li {
        line-height: 30px;
      }
    }

    .IMG {
      width: 70px;
      height: 70px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
.btn_box {
  /* position: fixed; */
  /* bottom: 0; */
  /* button {
			    width: 200px;

			  } */
  > div {
    display: flex;

    dl {
      dt {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      dd {
        text-align: center;
      }
    }
  }
}
.test_box {
  animation: mymove 2s infinite;
  height: 30px;
  position: fixed;
  top: 200px;
  left: 200px;
  color: #ffff;
  img {
    width: 50px;
    vertical-align: middle;
  }
}
@keyframes mymove {
  //滑动出来1s 停留展示1s
  0% {
    left: -160px;
    display: none;
  }
  1% {
    left: -160px;
    display: block;
  }
  50% {
    left: 200px;
  }
  99% {
    left: 200px;
  }
  100% {
    left: 200px;
    display: none;
  }
}
</style>