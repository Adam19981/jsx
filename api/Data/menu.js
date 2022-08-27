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
                            name: 'frontPage',
                            component: 'frontPage/frontPage.vue',
                            redirect: '/workbench',
                            showChildren:false,
                            mate:{
                                title:'工作台',icon:'el-icon-s-shop'
                            },
                            children: [
                                {
                                    path: '/workbench',
                                    name: 'workbench',
                                    component: 'workbench/workbench.vue',
                                    mate:{
                                        title:'工作台'
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
                            path: '/',
                            name: 'frontPage',
                            redirect: '/workbench',
                            component: 'frontPage/frontPage.vue',
                            showChildren:false,
                            mate:{
                                title:'工作台',icon:'el-icon-s-shop'
                            },
                            children: [
                                {
                                    path: '/workbench',
                                    name: 'workbench',
                                    component: 'workbench/workbench',
                                    mate:{
                                        title:'工作台'
                                    }
                                }
                            ]
                        }
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