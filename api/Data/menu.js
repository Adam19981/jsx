export default {
    getMenu: (config) => {
        const {userId} = JSON.parse(config.body)
        if (userId === 'admin') {
            return {
                code: 0,
                data: {
                    menu: [
                        {
                            path: '/',
                            name: 'workbench',
                            redirect: '/workbench/info',
                            component: 'mainContent',
                            isShowChildren:false,
                            meta: {
                                title: '工作台', icon: 'el-icon-s-home',
                            },
                            children: [
                                {
                                    path: '/workbench/info',
                                    name: 'workbenchInfo',
                                    component: 'workbench/workbench.vue',
                                    meta: {
                                        title: '工作台',
                                    }
                                }
                            ]
                        },
                        {
                            path: '/visualization',
                            name: 'visualization',
                            component: 'visualization/visualization.vue',
                            meta: {
                                title: '数据可视化', icon: 'el-icon-data-line',
                            },
                        },
                    ],
                    token: 'admin',
                    message: '获取成功'

                },
            }
        } else if (userId === 'user') {
            return {
                code: 0,
                data: {
                    menu: [
                        {
                            path: '/workbench',
                            name: 'workbench',
                            redirect: 'workbench/info',
                            component: 'mainContent',
                            meta: {
                                title: '工作台', icon: 'el-icon-s-shop',
                            },
                            children: [
                                {
                                    path: '/workbench/info',
                                    name: 'workbenchInfo',
                                    component: 'workbench/workbench.vue',
                                    meta: {
                                        title: '工作台',
                                    }
                                }
                            ]
                        },
                        {
                            path: '/visualization',
                            name: 'visualization',
                            component: 'visualization/visualization.vue',
                            meta: {
                                title: '数据可视化', icon: 'el-icon-data-line',
                            },
                        },
                    ],
                    token: 'user',
                    message: '获取成功'
                }

            }

        } else {
            return {
                code: -99,
                data: {
                    message: '密码错误'
                }

            }
        }
    }
}