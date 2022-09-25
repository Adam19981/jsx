export default {
    state:{
        breadcrumbList: [],
        isCollapse:false,
    },
    mutations:{
        //切换侧边栏
        changeIsCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        //增加面包屑
        addBreadcrumb(state, val) {
            const result = state.breadcrumbList.findIndex((item) => {
                return item.name === val.name
            })
            if (result === -1) {
                state.breadcrumbList.push(val)
            }

        },
        //关闭面包屑
        closeBreadcrumb(state, val) {
            const result = state.breadcrumbList.findIndex((item) => {
                return item.name === val.name
            })
            state.breadcrumbList.splice(result, 1)

        },
    }
}