<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <span class="demonstration">直播状态:</span>
        <el-cascader
          placeholder="请选择"
          :options="options"
          value="默认"
          @change="filtertype"
        />
      </div>

      <div class="header-right">
        <span class="sub-title">经纪人搜索:</span>
        <el-autocomplete
          v-model="value1"
          clearable
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input search"
          placeholder="姓名 ID"
          @change="handleSelect"
        />
      </div>
    </div>

    <div class="headertop">
      <h5>全部直播</h5>
    </div>

    <div class="main">
      <div class="main-video">
        <dl v-for="(item, index) in filterList" :key="index">
          <dt>
            <img :src="item.img" />
          </dt>
          <dd>
            <p>{{ item.title }}</p>
            <p>
              <span>{{ item.name }}</span> <span>{{ item.timer }}</span>
            </p>
            <p>
              <span @click="Router.push('/StreamingDetail')">进入直播</span>
              <span>{{ item.type }}</span>
            </p>
          </dd>
        </dl>
      </div>

      <!-- <div class="footer">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive, toRefs, onMounted, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const state = reactive({
      options: [
        {
          value: "",
          label: "默认",
          ind: 0,
        },
        {
          value: "B",
          label: "直播中",
          ind: 1,
        },
        {
          value: "C",
          label: "已结束",
          ind: 2,
        },
      ],
      value: "",
      list: [
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgres.qi58.com%2Fqi58%2F12%2F58974-202003201514395e746d5f3c297.jpg&refer=http%3A%2F%2Fimgres.qi58.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637997031&t=f9d27e2efdac982a35ed052b0b3acd2f",
          name: "昂桑",
          type: "已开播",
          id: "C",
          title: "榜一连夜扛着火车跑路",
          timer: new Date().toLocaleString(),
        },
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201710%2F08%2F20171008150523_P5wUc.thumb.400_0.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638003209&t=ef0e5c711ba04f876d6d20c21da74112",
          name: "Hide on bush",
          timer: new Date().toLocaleString(),
          title: "躲进草丛里",
          type: "已开播",
          id: "B",
        },
        {
          img: "https://img0.baidu.com/it/u=3191170209,1373119164&fm=26&fmt=auto",
          name: "hanzo",
          timer: new Date().toLocaleString(),
          title: "这里所有的一切曾经都属于我",
          type: "已开播",
          id: "B",
        },
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e89c57f8a638a84a0d304fe702b0.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638014961&t=b0a8f3e637d64c6eec30ec8beaded23d",
          name: "GenJI",
          timer: new Date().toLocaleString(),
          type: "未开播",
          title: "我年轻时在这里虚度了许多时光",
          id: "C",
        },
        {
          img: "data:image/jpeg;base64,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",
          name: "clearLove",
          timer: new Date().toLocaleString(),
          type: "未开播",
          title: "玩什么游戏不如回家养猪",
          id: "C",
        },
        {
          img: "https://img1.baidu.com/it/u=734196515,4111783701&fm=253&fmt=auto&app=120&f=JPEG?w=650&h=366",

          name: "Faker",
          timer: new Date().toLocaleString(),
          type: "已开播",
          title: "苦酒入喉,心作痛",
          id: "B",
        },
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-a54b20d6a8e33939ac7272f082869e3f_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637492924&t=5a2aef36ff9476b05e8927ad8374c878",
          name: "White",
          timer: new Date().toLocaleString(),
          type: "未开播",
          title: "撒娇的卡拉三等奖阿卡老实交代",
          id: "C",
        },
        {
          img: "https://img1.baidu.com/it/u=652496285,1182644904&fm=26&fmt=auto",
          name: "五五开",
          timer: new Date().toLocaleString(),
          type: "已开播",
          title: "我和Faker五五开",
          id: "B",
        },
        {
          img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-a54b20d6a8e33939ac7272f082869e3f_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637492924&t=5a2aef36ff9476b05e8927ad8374c878",
          name: "铁锅炖大鹅",
          timer: new Date().toLocaleString(),
          type: "未开播",
          title: "撒娇的卡拉三等奖阿卡老实交代",
          id: "C",
        },
      ],
      filterList: <any>[],
    });
    const restaurants: any = ref([]);
    state.filterList = state.list;
    const Router = useRouter();

    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value;
      // call callback function to return suggestions
      console.log(queryString);

      cb(results);
    };
    const createFilter = (queryString: any) => {
      return (restaurant: any) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    };
    const loadAll = () => {
      return [
        { value: "昂桑", link: "https://github.com/vuejs/vue" },
        { value: "hanzo", link: "https://github.com/ElemeFE/element" },
        { value: "Faker", link: "https://github.com/ElemeFE/cooking" },
        { value: "White", link: "https://github.com/ElemeFE/mint-ui" },
        { value: "clearLove", link: "https://github.com/vuejs/vuex" },
        { value: "五五开", link: "https://github.com/vuejs/vue-router" },
        { value: "铁锅炖大鹅", link: "https://github.com/babel/babel" },
      ];
    };

    const filtertype = (value: any) => {
      console.log(value);

      state.filterList = state.list.filter((item: any, index) => {
        return item.id.includes(value);
      });
    };

    const handleSelect = (value: any) => {
      console.log(value);

      state.filterList = state.list.filter((item: any, index) => {
        return item.name.includes(value);
      });
    };
    onMounted(() => {
      restaurants.value = loadAll();
    });

    return {
      ...toRefs(state),
      value1: ref(""),
      handleSelect,
      querySearch,
      loadAll,
      filtertype,
      Router,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 10px 13px;

  background: #fff;
  .header {
    width: 100%;
    display: flex;
  }
  .header-left {
    margin-right: 16px;
  }
  .header-right {
    .sub-title {
      margin-right: 10px;
    }
  }
  .headertop {
    margin: 26px 0 10px 0;
  }
  .demonstration {
    letter-spacing: 2px;
    margin-right: 10px;
  }
  .sub-title {
    letter-spacing: 2px;
  }
  .main {
    width: 100%;
    height: auto;
  }

  .main-video {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-items: center;

    dl {
      width: calc(100% / 6);
      height: calc(100% / 2);
      padding: 0 10px 10px 0;

      dt {
        width: 100%;
        height: 190px;
        border: 1px solid #cccc;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        font-size: 12px;

        p {
          line-height: 30px;
        }
        p:nth-of-type(1) {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        p:nth-of-type(2) {
          display: flex;
          flex-wrap: nowrap;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          align-items: center;
          justify-content: space-between;
          span:nth-of-type(1) {
            /* color: skyblue; */
            flex-shrink: 0;
          }

          span:nth-of-type(2) {
            color: tomato;

            flex-shrink: 0;
          }
        }

        p:nth-of-type(3) {
          span:nth-of-type(1) {
            color: skyblue;
          }

          span:nth-of-type(2) {
            color: tomato;
            margin-left: 50px;
          }
        }
      }
    }
  }
}
</style>