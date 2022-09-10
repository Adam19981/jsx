// 在地图上嵌入柱状图
const cityList = [{street_name: '景山街道', value: 1},
    {street_name: '娄桥街道', value: 20},
    {street_name: '仙岩街道', value: 100},
    {street_name: '郭溪街道', value: 120},
    {street_name: '新桥街道', value: 2},
    {street_name: '梧田街道', value: 50},
    {street_name: '潘桥街道', value: 30},
    {street_name: '丽岙街道', value: 70},
    {street_name: '南白象街道', value: 200},
    {street_name: '瞿溪街道', value: 1},
    {street_name: '茶山街道', value: 600},
    {street_name: '泽雅镇', value: 3},
    {street_name: '三垟街道', value: 10}]


export default function renderEachCity(that) {
    const optionColumn = {
        xAxis: [],
        yAxis: [],
        grid: [],
        series: []
    }
    that.$echarts.util.each(cityList, (dataItem, idx) => {
        if (dataItem.street_name !== '经济开发区') {
            // const inflationData = [dataItem.handle_cnt, dataItem.finish_handle_cnt]
            const inflationData = [10, 30]
            const geoCord = that.geoCordMap[dataItem.street_name] // 获得城市的坐标
            console.log(geoCord)
            const cord = that.chart.convertToPixel('geo', geoCord) // 转换坐标系上的点到像素坐标值。
            idx += ''

            optionColumn.xAxis.push({
                id: idx,
                gridId: idx,
                type: 'category',
                nameLocation: 'middle',
                name: dataItem.street_name,
                nameTextStyle: {
                    color: '#fff'
                },
                nameGap: 3,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                minInterval: 10,
                data: ['处理中', '已结案'],
                z: 100

            })
            optionColumn.yAxis.push({
                id: idx,
                gridId: idx,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#1C70B6'
                    }
                },
                max: 50,
                z: 100
            })
            optionColumn.grid.push({
                id: idx,
                width: 40,
                height: 50,
                left: cord[0] - 15,
                top: cord[1] - 15,
                z: 100
            })
            optionColumn.series.push({
                xAxisId: idx,
                yAxisId: idx,
                name: '处理中',
                type: 'bar',
                data: [inflationData[0]],
                itemStyle: {
                    normal: {
                        color: '#EFE48C',
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: { // 数值样式
                                color: '#EFE48C',
                                fontSize: 12
                            }
                        }
                    }
                }
            })
            optionColumn.series.push({
                xAxisId: idx,
                yAxisId: idx,
                name: '已结案',
                type: 'bar',
                data: [inflationData[1]],
                itemStyle: {
                    normal: {
                        color: '#62DADF',
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: { // 数值样式
                                color: '#62DADF',
                                fontSize: 12
                            }
                        }
                    }
                }

            })
        }
    })
    optionColumn['legend'] = {
        orient: 'vertical',
        data: ['处理中', '已结案'],
        x: '10px',
        y: 'bottom',
        textStyle: {
            color: '#F3FFFF'
        }
    }
    that.chart.setOption(optionColumn)
}
