<!--
 * @Author: your name
 * @Date: 2021-10-26 11:03:11
 * @LastEditTime: 2021-11-06 09:29:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \training-group-3\project_client\client\src\views\Article\Detail\index.vue
-->

<template>
  <div class="detail_home">
    <div class="detail_home_list">
      <div class="detail_list" v-loading="loading">
        <div class="detail_list_head">
          <img :src="state.detailsList.img" alt v-if="state.detailsList.img" />
          <b>{{ state.detailsList.title }}</b>
          <i
            >{{ $t("article.publish") }} {{ state.detailsList.date }} ·
            {{ $t("article.reading") }} {{ state.detailsList.num }}</i
          >
        </div>
        <div class="detail_list_item">
          <div class="item">
            <!-- 编辑器 -->
            <v-md-preview
              ref="preview"
              :text="state.title"
              v-show="showCon"
            ></v-md-preview>
          </div>
        </div>
        <div class="detail_footer">
          {{ $t("article.publish") }}{{ state.detailsList.date }} |
          {{ $t("article.copyright") }}
        </div>
      </div>
      <!--  左侧按钮 -->
      <div class="detailLove">
        <el-badge v-show="!isGive" :value="state.detailsList.love" class="item">
          <p @click="clickGives">
            <i class="iconfont icon-xihuan"></i>
          </p>
        </el-badge>
        <el-badge v-show="isGive" :value="state.detailsList.love" class="item">
          <p @click="clickGives">
            <i class="iconfont icon-xihuan2"></i>
          </p>
        </el-badge>
        <el-badge class="item" @click="scrollBottom">
          <p @click="clickGives">
            <i class="iconfont icon-pinglun1"></i>
          </p>
        </el-badge>
        <el-badge class="item">
          <p @click="clickGives">
            <i class="iconfont icon-fenxiang1"></i>
          </p>
        </el-badge>
      </div>
      <!-- 密码弹出框 -->
      <el-dialog
        v-model="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        title="文章受保护,请输入访问密码"
        width="40%"
      >
        <el-form ref="form">
          <el-form-item label="密码:">
            <el-input
              v-model="detailInput"
              placeholder="请输入访问密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="$router.push('/article')">回首页</el-button>
            <el-button type="primary" @click="enterDetail">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 付费弹出框 -->
      <el-dialog
        v-model="dialogVisible_money"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :value="state.detailsList.love"
        title="确认以下收费信息"
        width="40%"
      >
        <span>支付金额：￥{{ state.detailsList.money }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="$router.push('/article')">取消</el-button>
            <el-button type="danger" @click="routerMoneys">去支付</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 评论 -->
      <div
        class="comment"
        v-if="state.detailsList && state.detailsList.comment === 'true'"
      >
        <p class="comment_title">评论</p>
        <div class="comment_con menuBar">
          <p>
            <el-input
              v-model="comment"
              :rows="6"
              type="textarea"
              placeholder="请输入评论内容"
            />
          </p>
          <p style="padding: 16px 0 0 0">
            <el-button @click="publish(null)">发布</el-button>
          </p>
        </div>
        <div class="comment_list">
          <div v-for="v in messageComment" :key="v.id">
            <!-- 评论内容 -->
            <div class="item" v-if="!v.parentMessage">
              <p style="height: 16px" class="comment_block"></p>
              <div class="item_con">
                <div class="user_img">
                  <img :src="v.img" alt width="30" height="30" />
                </div>
                <div class="user_con">
                  <p>{{ v.name }}</p>
                  <p>{{ v.preContent }}</p>
                  <p
                    class="tagTextColor"
                    style="display: flex; align-items: center"
                  >
                    <span style="flex-shrink: 0">
                      {{ filterTime(v.date) }}
                    </span>
                    <el-collapse>
                      <el-collapse-item>
                        <template #title>
                          <span>
                            <i class="iconfont icon-huifu"></i> 回复
                          </span>
                        </template>
                        <el-input
                          :rows="6"
                          v-model="reply"
                          type="textarea"
                          placeholder="请输入回复内容"
                        />
                        <p style="display: flex; justify-content: flex-end">
                          <el-button @click="publish(v.id, v.id)"
                            >回复</el-button
                          >
                        </p>
                      </el-collapse-item>
                    </el-collapse>
                  </p>
                  <!-- 回复内容 -->
                  <template v-if="v.isChildren">
                    <div
                      class="reply_box"
                      v-for="item in filteComment(v.id)"
                      :key="item.id"
                    >
                      <p style="display: flex; align-items: center">
                        <img
                          :src="item.img"
                          alt
                          width="30"
                          height="30"
                          style="border-radius: 50%"
                        />
                        <span style="padding-left: 10px">
                          {{ item.name }}
                          <span>回复</span>
                          {{ find(item.parentMessage).name }}
                        </span>
                      </p>
                      <div class="reply_con" style="padding-left: 40px">
                        <p>{{ item.preContent }}</p>
                        <p
                          class="tagTextColor"
                          style="display: flex; align-items: center"
                        >
                          <span style="flex-shrink: 0; margin-right: 10px">
                            {{ filterTime(item.date) }}
                          </span>
                          <el-collapse accordion>
                            <el-collapse-item name="1">
                              <template #title>
                                <span>
                                  <i class="iconfont icon-huifu"></i>
                                  回复
                                </span>
                              </template>
                              <el-input
                                :rows="6"
                                v-model="reply"
                                type="textarea"
                                placeholder="请输入回复内容"
                              />
                              <p
                                style="display: flex; justify-content: flex-end"
                              >
                                <el-button @click="publish(item.id, v.id)"
                                  >回复</el-button
                                >
                              </p>
                            </el-collapse-item>
                          </el-collapse>
                        </p>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="read_recommend">
      <div class="read_recommend_sticky">
        <Read />
        <!-- 自定义锚点 -->
        <div class="anchors">
          <h3>目录</h3>
          <p
            v-for="(anchor, ind) in titles"
            :class="ind === 0 ? 'anchorsA anchorsActive' : 'anchorsA'"
            :key="ind"
            :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
            @click="handleAnchorClick(anchor, ind)"
          >
            <a style="cursor: pointer" class="anchorsAll">{{ anchor.title }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Read from "../../components/Read.vue";
import {
  getDetails,
  getGives,
  routerMoney,
  allMessage,
} from "../../api/detail";
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import Cookie from "js-cookie";
import { filterTime } from "../../utils/times";
export default {
  methods: {},
  setup() {
    const route = useRoute();
    let preview = ref(null);
    const store = useStore();
    const dialogVisible = ref(false);
    const dialogVisible_money = ref(false);
    const showCon = ref(true);
    let actived = ref(0);
    let loading = ref(true);
    let top = ref();
    const router = useRouter();
    let detailInput = ref("");
    let anchorsList = ref([]);
    const isGive = ref(false);
    //评论内容
    let comment = ref("");
    //回复内容
    let reply = ref("");
    // 全部评论的内容
    let messageComment = ref([]);
    let state = ref({
      detailsList: {},
      title: ``,
      html: ``,
      Read,
    });
    let titles = ref([]);
    let texts = ref([]);
    const getDetailLists = async () => {
      let res = await getDetails(route.params.id);
      state.value.detailsList = await res.data.details;
      state.value.title = await res.data.details.text;
      messageComment.value = await res.data.detailMessage;
      loading.value = false;
      // 判断当前页面是否点赞过
      let arr = JSON.parse(res.data.details.userLoveId);
      isGive.value = arr.includes(store.state.user.id);
      detailChang();
      // 进入详情页判断是否需要支付，进行拦截
      if (
        res.data.details.money &&
        (!res.data.details.encrypt ||
          sessionStorage.getItem("detailPassword") === res.data.details.encrypt)
      ) {
        dialogVisible_money.value = true;
        showCon.value = false;
      }
      // 进入详情页判断是否有密码，进行拦截
      if (
        res.data.details.encrypt &&
        sessionStorage.getItem("detailPassword") !== res.data.details.encrypt
      ) {
        dialogVisible.value = true;
        showCon.value = false;
      }
    };

    // 判断密码输入是否正确
    const enterDetail = () => {
      if (state.value.detailsList.encrypt !== detailInput.value) {
        ElMessage.error("访问密码输入有误");
        return;
      }
      // 关闭密码弹框
      dialogVisible.value = false;
      ElMessage.success("密码正确");
      //对密码进行存储,这样刷新页面不需要重新输入
      sessionStorage.setItem("detailPassword", detailInput.value);

      //判断是否需要支付
      if (state.value.detailsList.money) {
        dialogVisible_money.value = true;
      } else {
        showCon.value = true;
      }
    };

    //点击支付跳转支付页面
    const routerMoneys = async () => {
      let res = await routerMoney({
        detailMoney: state.value.detailsList,
      });
      if (res.status === 200) {
        window.location.href = res.data;
      }
    };

    // 添加自定义锚点
    getDetailLists();
    const detailChang = async () => {
      const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
      texts.value = Array.from(anchors).filter(
        (title) => !!title.innerText.trim()
      );
      anchorsList.value = document.querySelectorAll(".anchors .anchorsA");
      const hTags = Array.from(
        new Set(texts.value.map((title) => title.tagName))
      ).sort();
      titles.value = texts.value.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute("data-v-md-line"),
        indent: hTags.indexOf(el.tagName),
      }));
    };

    // 点击事件
    const handleAnchorClick = (anchor, ind) => {
      const { lineIndex } = anchor;
      const heading = preview.value.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      );
      if (heading) {
        document.querySelector(".home").scrollTop = heading.offsetTop;
        actived.value = ind;
      }
    };

    onMounted(() => {
      document.querySelector(".home").addEventListener("scroll", function (e) {
        top.value = e.target.scrollTop;
      });
      setTimeout(() => {
        detailChang();
      }, 500);
    });
    watch(top, (newTop) => {
      texts.value.forEach((item, i) => {
        if (newTop >= item.offsetTop + 82) {
          anchorsList.value.forEach((item) =>
            item.classList.remove("anchorsActive")
          );
          anchorsList.value[i].classList.add("anchorsActive");
        }
      });
    });
    // 点赞和取消点赞
    const clickGives = async () => {
      const token = Cookie.get("token");
      if (!token) {
        ElMessage.warning("请先登录");
        return;
      }
      let userId = store.state.user.id;
      let articleId = state.value.detailsList.id;
      let res = await getGives({
        user: {
          userId,
          articleId,
        },
      });
      if (res.data.statu === 200) {
        getDetailLists();
      }
    };
    watch(
      () => route.params.id,
      () => {
        // getDetailLists()
        router.go();
      }
    );
    //滚动到最下面
    const scrollBottom = (e) => {
      document.querySelector(".home").scrollTop =
        document.querySelector(".home").scrollHeight;
    };
    //发布评论
    const publish = async (id, maxid) => {
      if (!Cookie.get("token")) {
        ElMessage.warning("请登录");
        router.push("/login");
        return;
      }
      let res = await allMessage({
        messageList: {
          name: store.state.user.name,
          relation: store.state.user.email,
          preContent: id ? reply.value : comment.value,
          htmlContent: id ? reply.value : comment.value,
          article: route.params.id,
          img: store.state.user.img,
          parentMessage: id ? id : null,
          maxParent: maxid ? maxid : null,
        },
      });
      comment.value = "";
      reply.value = "";
      if (res.data.code === 200) {
        getDetailLists();
      }
    };
    //过滤出子评论
    const filteComment = (id) => {
      return messageComment.value
        .filter((item) => {
          return item.maxParent == id;
        })
        .sort((a, b) => a.id - b.id);
    };
    //通过id查找父级评论
    const find = (id) => {
      return messageComment.value.find((item) => item.id == id);
    };
    return {
      route,
      state,
      loading,
      clickGives,
      scrollBottom,
      filteComment,
      find,
      titles,
      actived,
      store,
      reply,
      comment,
      isGive,
      handleAnchorClick,
      preview,
      getGives,
      dialogVisible_money,
      routerMoneys,
      filterTime,
      onMounted,
      dialogVisible,
      messageComment,
      enterDetail,
      router,
      publish,
      showCon,
      detailInput,
    };
  },
  components: {
    Read,
  },
};
</script>

<style lang='scss'>
.detail_home {
  position: relative;
  margin-top: 52px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .detail_home_list {
    width: 800px;
    margin-top: 16px;
    position: relative;
    .el-collapse-item__wrap {
      border: none;
    }
    .el-collapse {
      border: none;
      flex: 1;
      .el-collapse-item__header {
        border: none;
      }
    }
  }
  .detail_list {
    width: 800px;
    margin-top: 16px;
    .detail_list_head {
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 450px;
        margin-bottom: 20px;
      }
      b {
        font-size: 40px;
        margin-bottom: 10px;
      }
    }
    .detail_list_item {
      margin-top: 10px;
      .item_header {
        display: flex;
        padding: 16px;
      }
      .items {
        padding: 10px;
        .items_box {
          padding: 10px 0;
        }
      }
    }
    .detail_footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 0;
      font-size: 12px;
      margin-top: 20px;
      color: #666;
    }
  }
}
.detailLove {
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 8%;
  top: 40%;
  .iconfont {
    font-size: 26px;
    color: #a6a6a6;
  }
  .item {
    margin-bottom: 10px;
  }
  .icon-xihuan2 {
    color: #ff0064;
  }
  p {
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    &:hover .iconfont {
      color: #ff0064;
    }
  }
}
.read_recommend {
  width: 320px;
  margin-top: 16px;
  .read_recommend_sticky {
    position: sticky;
    top: 84px;
    .anchors {
      margin-top: 20px;
      h3 {
        margin-bottom: 5px;
      }
      .anchorsA {
        // padding: 10px 0 10px 20px;
        .anchorsAll {
          padding-left: 5px;
        }
        &:hover {
          color: #ff0064;
        }
      }
      .anchorsActive {
        background-color: #f0f1f3;
        color: #ff0064;
      }
    }
  }
}

.comment {
  .comment_title {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    font-size: 16px;
  }
  .comment_con {
    padding: 16px;
    p:nth-of-type(2) {
      display: flex;
      justify-content: flex-end;
    }
  }
  .comment_list {
    .item {
      .item_con {
        display: flex;
        padding: 16px;
        .user_img {
          img {
            margin-top: 5px;
            border-radius: 50%;
          }
        }
        .user_con {
          flex: 1;
          padding-left: 10px;
          p {
            padding: 10px 0;
            font-size: 14px;
            &:nth-child(3) {
              font-size: 12px;
              span {
                margin: 0 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
