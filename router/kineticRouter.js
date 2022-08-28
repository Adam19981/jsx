import mainContent from '@/views/mainContent/mainContent.jsx'


function loadView(component) {
    return (resolve) => require([`@/views/${component}`], resolve)
}

export default function filterASyncRoutes(data) {
    data.forEach(item => {
        if (item['component'] === 'mainContent') {
            item["component"] = mainContent
        } else {
            item["component"] = loadView(item["component"])
        }
        // 路由递归，转换组件对象和路径
        if (item["children"] && item["children"].length > 0) {
            item['children'] = filterASyncRoutes(item.children)
        }
    })
    return data
}
