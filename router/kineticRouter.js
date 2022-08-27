function loadView(component) {
    return (resolve) => require([`@/views/${component}`], resolve)
}
export default function filterASyncRoutes(data) {
     data.forEach(item => {
        item["component"] = loadView(item["component"])
        // 路由递归，转换组件对象和路径
        if (item["children"] && item["children"].length > 0){
             item['children'] = filterASyncRoutes(item.children)
        }
    })
    return data
}
