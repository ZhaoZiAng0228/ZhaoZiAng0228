export const userRouter = [
    {
        path: '/layout',
        name: 'Layout',
        meta: {
            author: ['访客', '管理员']
        },
        component: () => import(/* webpackChunkName: "layout" */ '../Layout'),
        children: [
            {
                path: '/layout',
                redirect: '/layout/workbench',
                meta: {
                    author: ['访客', '管理员']
                },
            },
            {
                // 工作台
                path: '/layout/workbench',
                name: 'Workbench',
                meta: {
                    author: ['访客', '管理员']
                },
                component: () => import(/* webpackChunkName: "workbench" */ '../views/Workbench')
            },
            {
                // 文章管理
                path: '/layout/articles',
                name: 'Articles',
                meta: {
                    author: ['管理员']
                },
                component: () => import(/* webpackChunkName: "articles" */ '../views/Articles'),
                children: [
                    {
                        path: '/layout/articles/all',
                        name: 'All',
                        meta: {
                            author: ['管理员']
                        },
                        component: () => import(/* webpackChunkName: "all" */ '../views/Articles/All'),
                    },
                    {
                        path: '/layout/articles/classify',
                        name: 'Classify',
                        meta: {
                            author: ['管理员']
                        },
                        component: () => import(/* webpackChunkName: "classify" */ '../views/Articles/Classify'),
                    },
                    {
                        path: '/layout/articles/label',
                        name: 'Label',
                        meta: {
                            author: ['管理员']
                        },
                        component: () => import(/* webpackChunkName: "label" */ '../views/Articles/Label'),
                    },
                ]
            },
            {
                // 页面管理
                path: '/layout/page',
                name: 'Page',
                meta: {
                    author: ['管理员']
                },
                component: () => import(/* webpackChunkName: "page" */ '../views/Page')
            },
            {
                // 知识小册
                path: '/layout/knowledge',
                name: 'Knowledge',
                meta: {
                    author: ['访客', '管理员']
                },
                component: () => import(/* webpackChunkName: "knowledge" */ '../views/Knowledge')
            },
            {
                // 海报管理
                path: '/layout/poster',
                name: 'Poster',
                meta: {
                    author: ['访客', '管理员']
                },
                component: () => import(/* webpackChunkName: "poster" */ '../views/Poster')
            },
            {
                // 评论管理
                path: '/layout/comment',
                name: 'Comment',
                meta: {
                    author: ['管理员']
                },
                component: () => import(/* webpackChunkName: "comment" */ '../views/Comment')
            },
            {
                // 邮件管理
                path: '/layout/email',
                name: 'Email',
                meta: {
                    author: ['访客', '管理员']
                },
                component: () => import(/* webpackChunkName: "email" */ '../views/Email')
            },
            {
                // 文件管理
                path: '/layout/file',
                name: 'File',
                meta: {
                    author: ['管理员']
                },
                component: () => import(/* webpackChunkName: "file" */ '../views/File')
            },
            {
                // 搜索记录
                path: '/layout/search',
                name: 'Search',
                meta: {
                    author: ['访客', '管理员']
                },
                component: () => import(/* webpackChunkName: "search" */ '../views/Search')
            },
            {
                // 访问统计
                path: '/layout/visit',
                name: 'Visit',
                meta: {
                    author: ['访客', '管理员']
                },
                component: () => import(/* webpackChunkName: "visit" */ '../views/Visit')
            },
            {
                // 用户管理
                path: '/layout/user',
                name: 'User',
                meta: {
                    author: ['管理员']
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/User')
            },
            {
                // 系统设置
                path: '/layout/system',
                name: 'System',
                meta: {
                    author: ['管理员']
                },
                component: () => import(/* webpackChunkName: "system" */ '../views/System')
            },
            {
                // 个人中心
                path: '/layout/mySpace',
                name: 'MySpace',
                meta: {
                    author: ['访客', '管理员']
                },
                component: () => import(/* webpackChunkName: "mySpace" */ '../views/MySpace')
            },
            // {
            //     // 多人协作
            //     path: '/layout/collaboration',
            //     name: 'Collaboration',
            //     meta: {
            //         author: ['访客', '管理员']
            //     },
            //     component: () => import(/* webpackChunkName: "collaboration" */ '../views/Collaboration')
            // },
        ]
    },
    {
        path: '/editor',
        name: 'Editor',
        meta: {
            author: ['管理员']
        },
        component: () => import(/* webpackChunkName: "editor" */ '../views/Editor')
    },
]