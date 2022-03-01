<template>
	<div>
		<div id="main" style="width: 600px; height: 400px"></div>
	</div>
</template>

<script lang='ts'>
	import * as echarts from "echarts";
	import { onMounted } from "vue";

	export default {
		setup() {
			onMounted(() => {
				type EChartsOption = echarts.EChartsOption;

				var chartDom = document.getElementById("main")!;
				var myChart = echarts.init(chartDom);
				var option: EChartsOption;
				// prettier-ignore
				const data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];

				const dateList = data.map(function (item) {
					return item[0];
				});
				const valueList = data.map(function (item) {
					return item[1];
				});
				option = {
					darkMode: true,
					color: [
						"#4992ff",
						"#7cffb2",
						"#fddd60",
						"#ff6e76",
						"#58d9f9",
						"#05c091",
						"#ff8a45",
						"#8d48e3",
						"#dd79ff",
					],
					textStyle: {
						color: "#B9B8CE",
						fontFamily: "Microsoft YaHei",
						fontSize: 12,
						fontStyle: "normal",
						fontWeight: "normal",
					},
					timeAxis: {
						axisLine: {
							lineStyle: { color: "#B9B8CE" },
						},
						splitLine: {
							lineStyle: { color: "#484753" },
						},
						splitArea: {
							areaStyle: {
								color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"],
							},
						},
						minorSplitLine: {
							lineStyle: {
								color: "#20203B",
							},
						},
					},
					logAxis: {
						axisLine: {
							lineStyle: { color: "#B9B8CE" },
						},
						splitLine: {
							lineStyle: { color: "#484753" },
						},
						splitArea: {
							areaStyle: {
								color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"],
							},
						},
						minorSplitLine: {
							lineStyle: {
								color: "#20203B",
							},
						},
					},
					valueAxis: {
						axisLine: {
							lineStyle: { color: "#B9B8CE" },
						},
						splitLine: {
							lineStyle: { color: "#484753" },
						},
						splitArea: {
							areaStyle: {
								color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"],
							},
						},
						minorSplitLine: {
							lineStyle: {
								color: "#20203B",
							},
						},
					},
					categoryAxis: {
						axisLine: {
							lineStyle: { color: "#B9B8CE" },
						},
						splitLine: {
							lineStyle: { color: "#484753" },
						},
						splitArea: {
							areaStyle: {
								color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"],
							},
						},
						minorSplitLine: {
							lineStyle: {
								color: "#20203B",
							},
						},
					},
					line: {
						symbol: "circle",
					},
					graph: {
						color: [
							"#4992ff",
							"#7cffb2",
							"#fddd60",
							"#ff6e76",
							"#58d9f9",
							"#05c091",
							"#ff8a45",
							"#8d48e3",
							"#dd79ff",
						],
					},
					gauge: {
						title: {
							color: "#B9B8CE",
						},
						axisLine: {
							lineStyle: {
								color: [1, "rgba(207,212,219,0.2)"],
							},
						},
						axisLabel: {
							color: "#B9B8CE",
						},
						detail: {
							color: "#EEF1FA",
						},
					},
					candlestick: {
						itemStyle: {
							color: "#f64e56",
							color0: "#54ea92",
							borderColor: "#f64e56",
							borderColor0: "#54ea92",
						},
						colorBy: "series",
					},
					gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
					aria: {
						decal: {
							decals: [
								{
									color: "rgba(0, 0, 0, 0.2)",
									dashArrayX: [1, 0],
									dashArrayY: [2, 5],
									symbolSize: 1,
									rotation: 0.5235987755982988,
								},
								{
									color: "rgba(0, 0, 0, 0.2)",
									dashArrayX: [
										[8, 8],
										[0, 8, 8, 0],
									],
									dashArrayY: [6, 0],
									symbolSize: 0.8,
								},
								{
									color: "rgba(0, 0, 0, 0.2)",
									dashArrayX: [1, 0],
									dashArrayY: [4, 3],
									rotation: -0.7853981633974483,
								},
								{
									color: "rgba(0, 0, 0, 0.2)",
									dashArrayX: [
										[6, 6],
										[0, 6, 6, 0],
									],
									dashArrayY: [6, 0],
									symbolSize: 1,
									rotation: 0.5235987755982988,
								},
								{
									color: "rgba(0, 0, 0, 0.2)",
									dashArrayX: [
										[1, 0],
										[1, 6],
									],
									dashArrayY: [1, 0, 6, 0],
									rotation: 0.7853981633974483,
								},
								{
									color: "rgba(0, 0, 0, 0.2)",
									symbol: "triangle",
									dashArrayX: [
										[9, 9],
										[0, 9, 9, 0],
									],
									dashArrayY: [7, 2],
									symbolSize: 0.75,
								},
							],
						},
					},
					stateAnimation: {
						duration: 300,
						easing: "cubicOut",
					},
					animation: true,
					animationDuration: 1000,
					animationDurationUpdate: 500,
					animationEasing: "cubicInOut",
					animationEasingUpdate: "cubicInOut",
					animationThreshold: 2000,
					progressiveThreshold: 3000,
					progressive: 400,
					hoverLayerThreshold: 3000,
					useUTC: false,
					// Make gradient line here
					visualMap: [
						{
							show: false,
							type: "continuous",
							seriesIndex: 0,
							min: 0,
							max: 400,
						},
						{
							show: false,
							type: "continuous",
							seriesIndex: 1,
							dimension: 0,
							min: 0,
							max: dateList.length - 1,
						},
					],

					title: [
						{
							left: "center",
							text: "Gradient along the y axis",
							textStyle: {
								color: "#EEF1FA",
								fontSize: 18,
								fontWeight: "bold",
							},
							subtextStyle: {
								color: "#B9B8CE",
								fontSize: 12,
							},
							zlevel: 0,
							z: 6,
							show: true,
							target: "blank",
							subtext: "",
							subtarget: "blank",
							top: 0,
							backgroundColor: "rgba(0,0,0,0)",
							borderColor: "#ccc",
							borderWidth: 0,
							padding: 5,
							itemGap: 10,
							right: null,
						},
						{
							top: "55%",
							left: "center",
							text: "Gradient along the x axis",
							textStyle: {
								color: "#EEF1FA",
								fontSize: 18,
								fontWeight: "bold",
							},
							subtextStyle: {
								color: "#B9B8CE",
								fontSize: 12,
							},
							zlevel: 0,
							z: 6,
							show: true,
							target: "blank",
							subtext: "",
							subtarget: "blank",
							backgroundColor: "rgba(0,0,0,0)",
							borderColor: "#ccc",
							borderWidth: 0,
							padding: 5,
							itemGap: 10,
							right: null,
							bottom: null,
						},
					],
					axisPointer: [
						{
							lineStyle: {
								color: "#817f91",
								width: 1,
								type: "dashed",
							},
							// @ts-ignore
							crossStyle: {
								color: "#817f91",
							},
							label: {
								color: "#fff",
								show: true,
								formatter: null,
								precision: "auto",
								margin: 3,
								padding: [5, 7, 5, 7],
								backgroundColor: "auto",
								borderColor: null,
								borderWidth: 0,
								borderRadius: 3,
							},
							show: "auto",
							zlevel: 0,
							z: 50,
							type: "line",
							snap: false,
							triggerTooltip: true,
							value: null,
							status: null,
							animation: null,
							animationDurationUpdate: 200,
							shadowStyle: {
								color: "rgba(210,219,238,0.2)",
							},
							handle: {
								show: false,
								icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
								size: 45,
								margin: 50,
								color: "#333",
								shadowBlur: 3,
								shadowColor: "#aaa",
								shadowOffsetX: 0,
								shadowOffsetY: 2,
								throttle: 40,
							},
						},
					],
					tooltip: [
						{
							trigger: "axis",
							zlevel: 0,
							z: 60,
							show: true,
							showContent: true,
							triggerOn: "mousemove|click",
							alwaysShowContent: false,
							displayMode: "single",
							renderMode: "auto",
							confine: null,
							showDelay: 0,
							hideDelay: 100,
							transitionDuration: 0.4,
							enterable: false,
							backgroundColor: "#fff",
							shadowBlur: 10,
							shadowColor: "rgba(0, 0, 0, .2)",
							shadowOffsetX: 1,
							shadowOffsetY: 2,
							borderRadius: 4,
							borderWidth: 1,
							padding: null,
							extraCssText: "",
							axisPointer: {
								type: "line",
								axis: "auto",
								animation: "auto",
								animationDurationUpdate: 200,
								animationEasingUpdate: "exponentialOut",
							},
							textStyle: {
								color: "#666",
								fontSize: 14,
							},
						},
					],
					xAxis: [
						{
							data: dateList,
							axisLine: {
								lineStyle: {
									color: "#B9B8CE",
									width: 1,
									type: "solid",
								},
								show: true,
								onZero: true,
								onZeroAxisIndex: null,
								symbol: ["none", "none"],
								symbolSize: [10, 15],
							},
							splitLine: {
								lineStyle: {
									color: "#484753",
									width: 1,
									type: "solid",
								},
								show: false,
							},
							splitArea: {
								areaStyle: {
									color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"],
								},
								show: false,
							},
							minorSplitLine: {
								lineStyle: {
									color: "#20203B",
								},
							},
							boundaryGap: true,
							deduplication: null,
							axisTick: {
								alignWithLabel: false,
								interval: "auto",
								show: true,
								inside: false,
								length: 5,
								lineStyle: {
									width: 1,
								},
							},
							axisLabel: {
								interval: "auto",
								show: true,
								inside: false,
								rotate: 0,
								showMinLabel: null,
								showMaxLabel: null,
								margin: 8,
								fontSize: 12,
							},
							show: true,
							zlevel: 0,
							z: 0,
							inverse: false,
							name: "",
							nameLocation: "end",
							nameRotate: null,
							nameTruncate: {
								maxWidth: null,
								ellipsis: "...",
								placeholder: ".",
							},
							nameTextStyle: {},
							nameGap: 15,
							silent: false,
							triggerEvent: false,
							tooltip: {
								show: false,
							},
							axisPointer: {
								status: "hide",
								value: 49,
							},
							offset: 0,
							type: "category",
						},
						{
							data: dateList,
							gridIndex: 1,
						},
					],
					yAxis: [
						{},
						{
							gridIndex: 1,
						},
					],
					grid: [
						{
							bottom: "60%",
							show: false,
							zlevel: 0,
							z: 0,
							left: "10%",
							top: 60,
							right: "10%",
							containLabel: false,
							backgroundColor: "rgba(0,0,0,0)",
							borderWidth: 1,
							borderColor: "#ccc",
						},
						{
							top: "60%",
							show: false,
							zlevel: 0,
							z: 0,
							left: "10%",
							right: "10%",
							bottom: 70,
							containLabel: false,
							backgroundColor: "rgba(0,0,0,0)",
							borderWidth: 1,
							borderColor: "#ccc",
						},
					],
					series: [
						{
							type: "line",
							showSymbol: false,
							data: valueList,
							symbol: "circle",
							zlevel: 0,
							z: 3,
							coordinateSystem: "cartesian2d",
							legendHoverLink: true,
							clip: true,
							label: {
								position: "top",
							},
							endLabel: {
								show: false,
								valueAnimation: true,
								distance: 8,
							},
							lineStyle: {
								width: 2,
								type: "solid",
							},
							emphasis: {
								scale: true,
								lineStyle: {
									width: "bolder",
								},
								label: {},
							},
							step: false,
							smooth: false,
							smoothMonotone: null,
							symbolSize: 4,
							symbolRotate: null,
							showAllSymbol: "auto",
							connectNulls: false,
							sampling: "none",
							animationEasing: "linear",
							progressive: 0,
							hoverLayerThreshold: Infinity,
							universalTransition: {
								divideShape: "clone",
							},
						},
						{
							type: "line",
							showSymbol: false,
							data: valueList,
							xAxisIndex: 1,
							yAxisIndex: 1,
							symbol: "circle",
							zlevel: 0,
							z: 3,
							coordinateSystem: "cartesian2d",
							legendHoverLink: true,
							clip: true,
						},
					],
				};

				option && myChart.setOption(option);
			});
			return {};
		},
	};
</script>

<style lang="scss" scoped>
</style>