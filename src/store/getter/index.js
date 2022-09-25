
export  default {
    isCollapse: (state) => state.layoutStore.isCollapse,
    menu:(state)=> state.userStore.menu,
    info:(state)=> state.userStore.info,
    breadcrumbList:(state)=>state.layoutStore.breadcrumbList
}