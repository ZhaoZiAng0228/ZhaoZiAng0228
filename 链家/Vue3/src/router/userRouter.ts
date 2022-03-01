export function userRouter() {
  return [
    {
      path: "/",
      name: "Index",
      meta: {
        author: ["0", "1", "2"],
      },
      component: () =>
        import(/* webpackChunkName: "Index" */ "../views/Index.vue"),
      children: [
        // {
        //   path: "/",
        //   redirect: "/HouseResource",
        //   meta: {
        //     author: ["0", "1"],
        //     title: "",
        //   },
        // },
        {
          path: "/HouseResource",
          name: "HouseResource",
          meta: {
            author: ["0", "1", "2"],
            title: "房源管理",
            icon: "el-icon-menu",
          },
          component: () =>
            import(
              /* webpackChunkName: "HouseResource" */ "../views/HouseResource.vue"
            ),
        },
        {
          path: "/Streaming",
          name: "Streaming",
          meta: {
            author: ["0", "1"],
            title: "直播管理",
            icon: "el-icon-document",
          },
          component: () =>
            import(
              /* webpackChunkName: "Streaming" */ "../views/Streaming.vue"
            ),
        },
        // {
        //   path: "/GroupPurchase",
        //   name: "GroupPurchase",
        //   meta: {
        //     author: ["0"],
        //     title: "团购管理",
        //     icon: "el-icon-setting",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "GroupPurchase" */ "../views/GroupPurchase.vue"
        //     ),
        // },
        {
          path: "/ControlSystem",
          name: "ControlSystem",
          meta: {
            author: ["0"],
            title: "审核管理",
            icon: "el-icon-document-copy",
          },
          component: () =>
            import(
              /* webpackChunkName: "ControlSystem" */ "../views/ControlSystem.vue"
            ),
        },
        {
          path: "/OrderForm",
          name: "OrderForm",
          meta: {
            author: ["0"],
            title: "订单管理",
            icon: "el-icon-message",
          },
          component: () =>
            import(
              /* webpackChunkName: "OrderForm" */ "../views/OrderForm.vue"
            ),
        },
        {
          path: "/Information",
          name: "Information",
          meta: {
            author: ["0", "1"],
            title: "资讯管理",
            icon: "el-icon-chat-dot-round",
          },
          component: () =>
            import(
              /* webpackChunkName: "Information" */ "../views/Information.vue"
            ),
        },
        {
          path: "/Broker",
          name: "Broker",
          meta: {
            author: ["0"],
            title: "经纪人管理",
            icon: "el-icon-message",
          },
          component: () =>
            import(/* webpackChunkName: "Broker" */ "../views/Broker.vue"),
        },
        //--------------------------------------------------------聊天
        {
          path: "/chat",
          name: "Chat",
          meta: {
            author: ["1"],
            title: "客服中心",
            icon: "el-icon-phone",
          },
          component: () =>
            import(/* webpackChunkName: "Dashboard" */ "../views/Chat.vue"),
        },
        {
          path: "/StreamingDetail",
          name: "StreamingDetail",
          meta: {
            author: ["0", "1"],
            title: "直播详情",
            icon: "el-icon-message",
          },
          component: () =>
            import(
              /* webpackChunkName: "Streaming" */ "../views/StreamingDetail.vue"
            ),
        },
      ],
    },
  ];
}
