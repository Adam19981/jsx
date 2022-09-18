<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>

export default {
  name: 'Echarts',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      handler(options) {
        // 设置true清空echart缓存
        if (this.chart) {
          this.chart.setOption(options, true)
        }
      },
      deep: true
    }
  },

  mounted() {
    window.addEventListener('resize', this.chartResize)
    // this.$echarts.registerTheme('tdTheme', tdTheme) // 覆盖默认主题
    setTimeout(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    this.chart.dispose()
    this.chart = null
    window.removeEventListener('resize', this.chartResize)
  },
  methods: {
    chartResize() {
      this.chart.resize()
    },
    initChart() {
      // 初始化echart
      this.chart = this.$echarts.init(this.$el)
      this.chart.setOption(this.options, true)
    }
  }
}
</script>

<style>
</style>
