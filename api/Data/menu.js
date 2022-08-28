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
                            path: '/qwe',
                            name: 'qwe',
                            redirect: 'qwe/info',
                            component: 'qwe',
                            isShowChildren:true,
                            meta: {
                                title: 'qwe', icon: 'el-icon-s-shop',
                            },
                            children: [
                                {
                                    path: '/qwe/info',
                                    name: 'qweInfo',
                                    component: 'qwe/qwe.vue',
                                    meta: {
                                        title: 'qwe',
                                    }
                                }
                            ]
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
                            path: '/qwe',
                            name: 'qwe',
                            redirect: 'qwe/info',
                            component: 'qwe',
                            meta: {
                                title: 'qwe', icon: 'el-icon-s-shop',
                            },
                            children: [
                                {
                                    path: '/qwe/info',
                                    name: 'qweInfo',
                                    component: 'qwe/qwe.vue',
                                    meta: {
                                        title: 'qwe',
                                    }
                                }
                            ]
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