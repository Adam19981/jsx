<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" style="margin-top:20px">
        <el-card>
          <div slot="header" class="clearfix">
            <span class="cimg"></span>
            <div style="margin-left:100px">
              <h1>Admin</h1>
              <p>超级管理员</p>
            </div>
          </div>
          <div>
            <p>上次登录时间：2021-7-19</p>
            <p>上次登录地点：温州</p>
          </div>
        </el-card>
        <el-card style="margin-top:40px">
          <el-table
              :data="list"
              style="width: 100%">
            <el-table-column v-for="(val,key) in listtwo"
                             :key='key'
                             :prop="key"
                             :label="val"
                             width="120">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top:20px">
        <div class="num">
          <el-card v-for="item in countdate" :key='item.name' :body-style="{display:'flex',padding:0}" class='box-card'>
            <i class="iii" :class="'el-icon-'+item.icon" :style="{background:item.color}"></i>
            <div class="www">
              <p>{{item.name}}</p>
              <p>{{item.value}}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height:260px" class="one"></el-card>
        <div class="rrr">
          <el-card class="xxx">
          </el-card>
          <el-card class="xxxx">
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import * as echarts from 'echarts';

export default {
  name:'workbench',
  data() {
    return {
      list:[
        {
          name:'abc',
          todaybuy:100,
          monthbuy:200,
          totalbuy:300
        },
        {
          name:'abc',
          todaybuy:100,
          monthbuy:200,
          totalbuy:300
        },
        {
          name:'abc',
          todaybuy:100,
          monthbuy:200,
          totalbuy:300
        },
        {
          name:'abc',
          todaybuy:100,
          monthbuy:200,
          totalbuy:300
        },
        {
          name:'abc',
          todaybuy:100,
          monthbuy:200,
          totalbuy:300
        },
        {
          name:'abc',
          todaybuy:100,
          monthbuy:200,
          totalbuy:300
        }
      ],
      listtwo:
          {
            name:'课程',
            todaybuy:'今日购买',
            monthbuy:'本月购买',
            totalbuy:'总购买'
          },
      countdate:[
        {
          name:'今日支付订单',
          value:1234,
          icon:'success',
          color:'#ffb980'
        },
        {
          name:'昨日支付订单',
          value:1234,
          icon:'success',
          color:'#ffb980'
        },
        {
          name:'明日支付订单',
          value:1234,
          icon:'success',
          color:'#ffb980'
        },
        {
          name:'周日支付订单',
          value:1234,
          icon:'success',
          color:'#ffb980'
        },
        {
          name:'月日支付订单',
          value:1234,
          icon:'success',
          color:'#ffb980'
        },
        {
          name:'年日支付订单',
          value:1234,
          icon:'success',
          color:'#ffb980'
        }
      ]
    }
  },
  mounted() {
    var chartDom = document.querySelector('.one');
    var myChart = echarts.init(chartDom);
    var option;
    var chartDomone = document.querySelector('.xxx');
    var myChartone = echarts.init(chartDomone);
    var optionone;
    var chartDomtwo = document.querySelector('.xxxx');
    var myCharttwo = echarts.init(chartDomtwo);
    var optiontwo;

    option = {
      title: {
        text: '收件统计图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    optionone = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
    optiontwo = {
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },

        }
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [10, 80],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 6
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' }
          ]
        }
      ]
    };
    option && myChart.setOption(option);
    optionone && myChartone.setOption(optionone);
    optiontwo && myCharttwo.setOption(optiontwo);
  }

}
</script>
<style lang="less" scoped>
.cimg{
  display: block;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  background-color: skyblue;

}
.clearfix{
  display: flex;
  justify-content:flex-start
}
.num{
  display: flex;
  justify-content:space-between;
  flex-wrap:wrap;
  align-items:center;
  height: 240px;
}
.iii{
  width: 30%;
  height: 100px;
  font-size: 48px;
  line-height: 100px;
  text-align: center;
}
.box-card{
  width: 320px;
  height: 100px;
}
.www{
  margin-left: 20px;
}
.rrr{
  display: flex;
  justify-content:space-between;
}
.xxx{
  width: 48%;
  height: 250px;
  margin-top:30px;
}
.xxxx{
  width: 48%;
  height: 250px;
  margin-top:30px;
}

</style>