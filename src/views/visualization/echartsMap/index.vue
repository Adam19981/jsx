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

    <div id="map" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
import mapData from './mapData.json'
import renderEachCity from "./echartsMapMethod";
const cityList = [     {street_name: '景山街道', value: 1},
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
export default {
  name: 'echartsMap',
  data() {
    return {

      centerList: [
        {name: '案发情况', isSelect: true},
        {name: '满意度情况', isSelect: false},
        {name: '刑事案件量', isSelect: false}
      ],
      options: {},
      chart: '',
      isToday: false,
      centerName: '案发情况',
      geoCordMap: {
        '景山街道': [120.6271, 28.0075],
        '娄桥街道': [120.6098, 27.9573],
        '仙岩街道': [120.6776, 27.8843],
        '郭溪街道': [120.5437, 28.0162],
        '新桥街道': [120.6280, 27.9895],
        '梧田街道': [120.6570, 27.9721],
        '潘桥街道': [120.5588, 27.9380],
        '丽岙街道': [120.6313, 27.9052],
        '南白象街道': [120.6764, 27.9406],
        '瞿溪街道': [120.5097, 27.9838],
        '茶山街道': [120.7150, 27.9201],
        '泽雅镇': [120.4138, 28.0205],
        '三垟街道': [120.7073, 27.9638]
      }
    }
  },

  mounted() {
    window.addEventListener('resize', this.chartResize)
    setTimeout(() => {
      this.initChart()
      this.getQuery()
    })
  },
  methods: {
    getQuery() {
      switch (this.centerName) {
        case "案发情况":
          this.drawEcharts('案发情况')
          break
        case '满意度情况':
          this.drawEcharts('满意度情况')
          break
        case '刑事案件量':
          this.drawEcharts('刑事案件量')
          break
      }

    },
    selectCenter(item) {
      this.centerList.forEach(ite => {
        ite.isSelect = false
      })
      item.isSelect = true
      this.centerName = item.name
      this.getQuery()
    },
    initChart() {
      this.chart = this.$echarts.init(document.getElementById('map'))
      this.$echarts.registerMap('wz', mapData)
    },
    chartResize() {
      this.chart.resize()
    },

    drawEcharts(status) {
      let splitList
      let showDataRange
      switch (status) {
        case '案发情况':
          showDataRange = true
          splitList = [
            {start: 20, label: '>20 发案次数', color: 'rgba(255, 92, 69, 0.24)'},
            {start: 10, end: 20, label: '10-20 发案次数', color: 'rgba(245, 229, 102, 0.24)'},
            {start: 1, end: 10, label: '1-10 发案次数', color: 'rgba(66, 176, 239, 0.24)'},
            {start: 0, end: 0, label: '0 发案次数', color: 'rgba(90, 239, 123, 0.24)'}
          ]
          break
        case '满意度情况':
          showDataRange = false
          splitList = [
            {start: 0, end: 60, label: '不满意 （<60%）', color: 'rgba(255, 92, 69, 0.24)'},
            {start: 60, end: 80, label: '较为满意 （80%>60%）', color: 'rgba(245, 229, 102, 0.24)'},
            {start: 80, label: '非常满意 （>80%）', color: 'rgba(90, 239, 123, 0.24)'}
          ]
          break
      }
      const options = {
        toolbox: {
          show: true,
          left: 'center',
          top: 'center'
        },
        layoutCenter: ['30%', '30%'],
        tooltip: {
          className: 'tooltipStyle',
          formatter(params) {
            let html = `<div style="background-color:rgba(0,0,0,0.9);padding: 10px 10px 20px">
                         <div style="color:#fff;font-size: 16px;font-weight: 500;margin-bottom: 20px">${params.name}</div>`
            if (status === '案发情况') {
              let waitHandleCnt = 0
              let handlingCnt = 0
              let progress = 0
              html += `
                         <div style="display: flex;justify-content: space-around">
                             <div>
                              <div style="color:#EFE48C;font-weight: 500;font-style: italic;font-size: 24px;margin-bottom: 10px">${waitHandleCnt}</div>
                              <div style="color:#EFE48C">待处理</div>
                            </div>
                            <div>
                              <div  style="color:#5CE079;font-weight: 500;font-style: italic;font-size: 24px;margin-bottom: 10px">${handlingCnt}</div>
                              <div style="color:#5CE079">处理中</div>
                            </div>
                            <div>
                              <div style="color:#3FAEC1;font-weight: 500;font-style: italic;font-size: 24px;margin-bottom: 10px">${(progress * 100).toFixed(1)}%</div>
                              <div style="color:#3FAEC1">进度</div>
                            </div>
                         </div>
                         <div style="position: relative;background-color: rgba(153, 153, 153, 0.29);width: 100%;height: 8px;margin: 20px 0 0">
                           <div style="position: absolute;background-color:#3FAEC1;width: ${progress}%;height: 8px;top: 0;left: 0"></div>
                         </div>
                        </div>`
            } else if (status === '满意度情况') {
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
            data: [
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
              {name: '三垟街道', value: 10}],
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
            zoom: 1.25,
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
      if (status === '刑事案件量') {
        options['geo'] = [ // 配合柱状图嵌入 所以使用geo绘制地图，并清空series里面的数据，不然会绘制出两个地图
          {
            map: 'wz',
            zoom: 1.25,
            itemStyle: options.series[0].itemStyle,
            select: options.series[0].select,
            tooltip: options.tooltip
          }
        ]
        options.geo[0].itemStyle.normal.borderColor = 'rgba(134, 253, 250, 0.32)'
        options.series = []
        this.chart.setOption(options, true)
        renderEachCity(this,cityList) // 柱状图嵌入方法
      } else {
        console.log(showDataRange)
        options['dataRange'] = {
          show: showDataRange,
          x: '10px',
          y: 'bottom',
          splitList: splitList,
          textStyle: {
            color: '#96D5DE', // 值域文字颜色
            fontWeight: 500
          }
        }
        this.chart.setOption(options, true)
      }
    }

  }
}
</script>

<style scoped lang="less">
.mapMain {
  position: relative;
  width: 54%;
  height: 61%;
  padding-top: 20px;

  .topPage {
    display: flex;
    position: absolute;
    width: 350px;
    top: 0;
    margin-right: -175px;
    right: 50%;
    z-index: 99;

    .topUl {
      background: rgba(6, 37, 56, 0.84);
      border: 1px solid rgba(47, 142, 159, 0.18);
      padding: 5px 10px;

      .topLi {
        cursor: pointer;
        padding: 5px 10px;
        color: #fff;
        font-weight: 500;
        border: 1px solid transparent
      }
    }
  }
}

.isSelect {
  background: rgba(38, 70, 90, 0.84);
  border: 1px solid #5ae3fb !important;
}

</style>
