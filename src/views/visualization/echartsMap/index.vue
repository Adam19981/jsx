<template>
  <div class="mapMain">

    <div class="topPage">
      <div
          v-for="item in centerList"
          class="topUl"
          :key="item.name">
        <div @click="selectCenter(item)" class="topLi" :class="{'isSelect':item.isSelect}">{{ item.name }}</div>
      </div>
    </div>

    <div id="map"
         :style="{transform:type===1?'scale(1.15)':'scale(1)',marginTop:type===1?'20px':'-20px'}"></div>
  </div>
</template>

<script>
import mapData from './mapData.json'
import mapWenZhou from './mapWenZhou.json'
import renderEachCity from "./echartsMapMethod";


export default {
  name: 'echartsMap',
  props:{
    type:{
      type:Number,
      default:1
    }
  },
  data() {
    return {

      centerList: [
        {name: '满意度情况', isSelect: true},
        {name: '刑事案件量', isSelect: false}
      ],
      options: {},
      chart: '',
      isToday: false,
      timer: null,
      centerName: '满意度情况',
      dataValue: [
        {name: '永嘉县', value: 1},
        {name: '乐清市', value: 20},
        {name: '鹿城区', value: 100},
        {name: '瓯海区', value: 120},
        {name: '龙湾区', value: 2},
        {name: '洞头区', value: 50},
        {name: '瑞安市', value: 30},
        {name: '文成县', value: 70},
        {name: '平阳县', value: 200},
        {name: '龙港市', value: 1},
        {name: '泰顺县', value: 200},
        {name: '苍南县', value: 1},
      ]

    }
  },

  mounted() {
    window.addEventListener('resize', this.chartResize)
    setTimeout(() => {
      this.initChart()
      this.drawEcharts()
    })
  },
  methods: {
    selectCenter(item) {
      this.centerList.forEach(ite => {
        ite.isSelect = false
      })
      item.isSelect = true
      this.centerName = item.name
    },
    initChart() {
      this.chart = this.$echarts.init(document.getElementById('map'))
      this.$echarts.registerMap('wz', mapWenZhou)
    },
    chartResize() {
      this.chart.resize()
    },

    drawEcharts() {
      let splitList
      switch (this.centerName) {
        case '满意度情况':
          splitList = [
            {start: 0, end: 60, label: '不满意 （<60%）', color: 'rgba(219,112,147,1)'},
            {start: 60, end: 80, label: '较为满意 （80%>60%）', color: 'rgba(245, 229, 102,1)'},
            {start: 80, label: '非常满意 （>80%）', color: 'rgba(0,255,255, 0.1)'}
          ]
          break
      }
      const options = {
        tooltip: {
          className: 'tooltipStyle',
          formatter(params) {
            let html = `<div style="background-color:rgba(0,0,0,0.9);padding: 10px 10px 20px">
                         <div style="color:#fff;font-size: 16px;font-weight: 500;margin-bottom: 20px">${params.name}</div>`
            if (status === '满意度情况') {
              let evaluations = 0 // 评价数
              let satisfaction = 0 // 满意度
              html += `
                         <div style="display: flex;justify-content: space-around">
                             <div>
                              <div style="color:#fff;font-weight: 500;font-style: italic;font-size: 24px;margin-bottom: 10px">${evaluations}</div>
                              <div style="color:#fff">评价数</div>
                            </div>
                            <div>
                              <div  style="color:#F06E5B;font-weight: 500;font-style: italic;font-size: 24px;margin-bottom: 10px">${(satisfaction * 100).toFixed(1)}%</div>
                              <div style="color:#fff">满意度</div>
                            </div>
                         </div>
                         <div style="display: flex;justify-content: center">
                          <div style="width: 80px;height: 80px;border-radius: 50%;background: rgba(153, 153, 153, 0.29);position: relative;margin: 20px 0 0">
                           <div style="position: absolute;top: 50%;left: 50%;z-index: 100;transform: translate(-50%, -50%);width: 60px;height: 60px;background: #000;border-radius: 50%;"></div>
                           <div style=" width: 40px;height: 80px;float: left;overflow: hidden;border-radius: 80px 0 0 80px;">
                             <div style="width: 40px;height: 80px;background: #F06E5B;transform-origin: right center;transform: rotate(${180 - satisfaction * 50}deg);"></div>
                           </div>
                           <div style=" width: 40px;height: 80px;float: left;overflow: hidden;border-radius: 0 80px 80px 0;">
                             <div style="width: 50px;height: 80px;background: #F06E5B;transform-origin: left center;transform: rotate(${180 - satisfaction * 50}deg);"></div>
                           </div>
                         </div>
                         </div>`
            } else {
              let handlingCnt = 0 // 处理中
              let allCnt = 0 // cnt
              let finishCnt = 0 // 已结案
              html += `
                         <div style="display: flex;justify-content: space-around">
                             <div>
                              <div style="color:#EFE48C;font-weight: 500;font-size: 24px;margin-bottom: 10px;font-style: italic;">${handlingCnt}</div>
                              <div style="background-color:#EFE48C;width: 10px;height: 10px;display: inline-block"></div>
                              <div style="color:#EFE48C;display: inline-block">处理中</div>
                            </div>
                            <div>
                              <div  style="color:#58E3E4;font-weight: 500;font-size: 24px;margin-bottom: 10px;font-style: italic;">${finishCnt}</div>
                               <div style="background-color:#58E3E4;width: 10px;height: 10px;display: inline-block"></div>
                              <div style="color:#58E3E4;display: inline-block">已结案</div>
                            </div>
                             <div>
                              <div style="color:#d9d9d9;font-weight: 500;font-size: 24px;margin-bottom: 10px;font-style: italic;">${allCnt}</div>
                              <div style="background-color:#d9d9d9;width: 10px;height: 10px;display: inline-block"></div>
                              <div style="color:#d9d9d9;display: inline-block">总计</div>
                            </div>
                         </div>`
            }
            html += `</div>`
            return html
          }
        },
        series: [
          {
            type: 'map',
            mapType: 'wz', //
            data: this.dataValue,
            label: {
              show: true,
              textStyle: {
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff'
              }, // 省份标签字体颜色
              emphasis: { // 对应的鼠标悬浮效果
                show: true,
                textStyle: {
                  color: '#333',
                  fontWeight: 700
                }
              }

            },
            zoom: 1.1,
            itemStyle: {
              normal: { // 默认背景颜色
                borderColor: '#999',
                borderWidth: 2,
                areaColor: 'rgba(255, 255, 255, 0.12)'
              },
              emphasis: { // 鼠标移动后后颜色
                borderWidth: 2,
                borderColor: '#ffffb9',
                areaColor: '#efe48c'
              }
            },
            select: { // 选中后颜色
              itemStyle: {
                borderWidth: 2,
                borderColor: '#ffffb9',
                areaColor: '#efe48c'
              }
            }
          }
        ]
      }
      if (this.centerName === '刑事案件量') {
        options['geo'] = [ // 配合柱状图嵌入 所以使用geo绘制地图，并清空series里面的数据，不然会绘制出两个地图
          {
            map: 'wz',
            zoom: 1.1,
            itemStyle: options.series[0].itemStyle,
            select: options.series[0].select,
            tooltip: options.tooltip
          }
        ]
        options.geo[0].itemStyle.normal.borderColor = 'rgba(134, 253, 250, 0.32)'
        options.series = []
        this.chart.setOption(options, true)
        renderEachCity(this) // 柱状图嵌入方法
      } else {
        options['dataRange'] = {
          show: true,
          x: '7%',
          y: '84%',
          splitList: splitList,
          textStyle: {
            color: '#96D5DE', // 值域文字颜色
            fontWeight: 500
          }
        }
        this.chart.setOption(options, true)
        this.chart.on('click', (val) => {
          if (val.name === '瓯海区') {
            this.getNext()
          }

        })
      }
    },
    getNext() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        await this.$echarts.registerMap('wz', mapData)
        await this.chart.resize()
        this.dataValue = [
          {name: '景山街道', value: 1},
          {name: '娄桥街道', value: 20},
          {name: '仙岩街道', value: 100},
          {name: '郭溪街道', value: 120},
          {name: '新桥街道', value: 2},
          {name: '梧田街道', value: 50},
          {name: '潘桥街道', value: 30},
          {name: '丽岙街道', value: 70},
          {name: '南白象街道', value: 200},
          {name: '瞿溪街道', value: 1},
          {name: '茶山街道', value: 600},
          {name: '泽雅镇', value: 3},
          {name: '三垟街道', value: 10}
        ]
        this.drawEcharts()
      }, 200)
    }
  }
}
</script>

<style scoped lang="less">
.mapMain {
  position: relative;
  width: 48%;
  height: 60%;
  padding-top: 20px;


  .topPage {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;

    .topUl {
      background: rgba(6, 37, 56, 0.84);
      border: 1px solid rgba(47, 142, 159, 0.18);
      padding: 5px 10px;
      color: #fff;

      .topLi {
        cursor: pointer;
        padding: 5px 10px;
        border: 1px solid transparent
      }
    }

    .topUl:hover {
      color: #96D5DE;
      font-weight: 700;
    }
  }
}

.isSelect {
  background: rgba(38, 70, 90, 0.84);
  border: 1px solid #5ae3fb !important;
}
#map{
  transition: 0.5s;
  width: 100%;
  height: 100%
}
</style>
