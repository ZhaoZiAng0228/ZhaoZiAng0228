<!--
 * @Author: your name
 * @Date: 2021-10-14 17:09:28
 * @LastEditTime: 2021-10-14 22:39:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\training-group-3\server_demo\src\components\Echart\1.vue
-->
<template>
  <div id="main" style="width: auto; height: 400px;background:#fff;"></div>
</template>


<script>
import * as echarts from "echarts";

export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      legend: {
        data: ["评论数", "访问量"],
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "每周用户访问指标",
          min: 0,
          max: 400,
          interval: 100,
          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      series: [
        {
          name: "评论数",
          type: "bar",
          data: [110, 200, 130, 80, 70, 120, 130],
          color: ["#c23531"],
        },
        {
          color: ["#2f4554"],
          name: "访问量",
          type: "line",
          data: [370, 290, 350, 130, 100, 140, 180],
        },
      ],
    });
  },
};
</script>

<style>
.count-chart-wrapper {
  margin: 0 auto;
}
.count-chart {
  position: relative;
  margin: 0 auto;
  width: 900px;
  background-color: #fff;
  height: 450px;
}
element.style {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 600px;
  height: 200px;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  border-width: 0px;
}
</style>