<template>
	<dynamic-border class="main" :height="type === 1 ? '31%' : '60%'" :width="'23%'">
		<echarts ref="echarts" :options="options"></echarts>
	</dynamic-border>
</template>

<script>
export default {
	name: "rightBottom",
	props: {
		type: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			options: {}
		};
	},
	watch: {
		type(val) {
			switch (val) {
				case 1:
					this.drawEcharts();
					break;
				case 2:
					this.drawEchartsV2();
					break;
			}
			setTimeout(() => {
				this.$refs.echarts.chartResize();
			}, 500);
		}
	},
	mounted() {
		this.drawEcharts();
	},
	methods: {
		drawEcharts() {
			this.options = {
				tooltip: {},
				legend: {
					show: true,
					icon: "circle",
					bottom: 10,
					center: 0,
					itemWidth: 14,
					itemHeight: 14,
					shadowColor: "rgba(0, 0, 0, 1)",
					shadowBlur: 30,
					shadowOffsetX: 10,
					shadowOffsetY: 10,
					orient: "horizontal",
					data: ["一级权重分析", "二级权重分析"],
					textStyle: {
						fontSize: 12,
						color: "#fff"
					}
				},

				radar: {
					radius: "75%",
					center: ["50%", "50%"],
					startAngle: 0,
					triggerEvent: true,
					name: {
						textStyle: {
							color: "#fff",
							fontSize: "14",
							borderRadius: 3,
							padding: [0, 10]
						}
					},
					nameGap: "2",
					indicator: [
						{
							name: "设备",
							min: 0,
							max: 6500
						},
						{
							name: "建材",
							max: 16000
						},
						{
							name: "食品",
							max: 30000
						},
						{
							name: "服装",
							max: 38000
						},
						{
							name: "旅游",
							max: 52000
						}
					],
					splitArea: {
						areaStyle: {
							color: [
								"rgba(0,255,255, 0.1)",
								"rgba(0,255,255, 0.2)",
								"rgba(0,255,255, 0.3)",
								"rgba(0,255,255, 0.4)",
								"rgba(0,255,255, 0.5)",
								"rgba(0,255,255, 0.6)"
							].reverse(),
							shadowColor: "rgba(0, 0, 0, 1)",
							shadowBlur: 30,
							shadowOffsetX: 10,
							shadowOffsetY: 10
						}
					},
					axisLine: {
						lineStyle: {
							color: "rgba(0,206,209, 0.3)"
						}
					},
					splitLine: {
						lineStyle: {
							width: 1,
							color: [
								"rgba(0,206,209, 0.1)",
								"rgba(0,206,209, 0.2)",
								"rgba(0,206,209, 0.3)",
								"rgba(0,206,209, 0.4)",
								"rgba(0,206,209, 0.5)",
								"rgba(0,206,209, 0.6)"
							].reverse()
						}
					}
				},
				series: [
					{
						name: "一级权重分析",
						type: "radar",
						areaStyle: {
							normal: {
								color: "rgba(127,255,210, 0.5)"
							}
						},
						symbol: "circle",
						symbolSize: 12,
						itemStyle: {
							color: "rgba(127,255,210,0.8)",
							borderColor: "rgba(127,255,210,0.2)",
							borderWidth: 10
						},
						lineStyle: {
							color: "rgba(127,255,210, 0.6)",
							width: 2
						},

						data: [[4600, 13000, 25000, 23500, 25000]]
					},
					{
						name: "二级权重分析",
						type: "radar",
						areaStyle: {
							normal: {
								color: "rgba(255,237,145, 0.5)"
							}
						},
						symbol: "circle",
						symbolSize: 12,
						itemStyle: {
							color: "rgba(255,237,145,0.8)",
							borderColor: "rgba(255,237,145,0.2)",
							borderWidth: 10
						},
						lineStyle: {
							color: "rgba(255,237,145, 0.6)",
							width: 2
						},
						data: [[5300, 15000, 12800, 13500, 15000]]
					}
				]
			};
		},
		drawEchartsV2() {
			function getSymbolData(data) {
				let arr = [];
				for (let i = 0; i < data.length; i++) {
					arr.push({
						value: data[i],
						symbolPosition: "end"
					});
				}
				return arr;
			}

			const salveProValue = [60, 50, 40, 30, 20, 80, 20, 100];
			const salveProMax = []; //背景按最大值
			for (let i = 0; i < salveProValue.length; i++) {
				salveProMax.push(100);
			}
			this.options = {
				grid: {
					left: "20",
					right: "20",
					bottom: "0",
					top: "0",
					containLabel: true
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "none"
					},
					formatter: function (params) {
						return params[0].name + " : " + params[0].value;
					}
				},
				xAxis: {
					show: false,
					type: "value"
				},
				yAxis: [
					{
						type: "category",
						inverse: true,
						axisLabel: {
							show: true,
							textStyle: {
								color: "#00D1F0"
							},
							rich: {
								a: {
									color: "#00D1F0",
									fontWeight: "800",
									fontSize: 15
								}
							}
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},
						data: ["XX设备", "XX设备", "XX设备", "XX设备", "XX设备", "XX设备", "XX设备", "XX设备"]
					},
					{
						type: "category",
						inverse: true,
						axisTick: "none",
						axisLine: "none",
						show: true,
						axisLabel: {
							textStyle: {
								color: "#00D1F0",
								// fontSize: '12',
								fontWeight: "800"
							}
						},
						data: salveProValue
					}
				],
				series: [
					{
						name: "值",
						type: "bar",
						itemStyle: {
							normal: {
								barBorderRadius: 30,
								color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
									{
										offset: 0,
										color: "rgb(46,200,207,1)"
									},
									{
										offset: 1,
										color: "rgb(129, 238, 242,1)"
									}
								])
							}
						},
						z: 2,
						barWidth: 10,
						data: salveProValue
					},
					{
						name: "XXX",
						type: "pictorialBar",
						symbol:
							"image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==",
						symbolSize: [80, 80],
						symbolOffset: [30, 0],
						itemStyle: {
							normal: {
								color: "#14b1eb"
							}
						},
						data: getSymbolData(salveProValue)
					},
					{
						name: "背景",
						type: "bar",
						barWidth: 10,
						barGap: "-100%",
						data: salveProMax,
						itemStyle: {
							normal: {
								color: "#091C24",
								barBorderRadius: 30
								// backgroundColor:'#091C24'
								// borderColor:'#00D1F0'
							}
						},
						z: 1
					}
				]
			};
		}
	}
};
</script>

<style scoped lang="scss">
.main {
	transition: 0.5s;

	.chart {
		position: absolute;
		z-index: 10;
	}
}
</style>
