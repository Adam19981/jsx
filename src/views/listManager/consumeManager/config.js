export default [
    {
        label: '商品名称',
        align: 'center',
        prop: 'name',
    },
    {
        label: '价格',
        align: 'center',
        prop: 'price',
        render: (h, params) => {
            return h('div', params.price + '元')
        }
    },
    {
        label: '用作',
        align: 'center',
        prop: 'effect',
    },
    {
        label: '操作',
        prop: 'operation',
        align: 'center',
        fixed: 'right',
        width: 150
    }
]
