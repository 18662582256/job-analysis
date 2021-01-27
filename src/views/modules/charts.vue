<template>
    <div :id="id" class="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
    props: {
        id: {
            type: String,
            default: () => {
                return "";
            },
        },
        title: {
            type: String,
            default: () => {
                return "";
            },
        },
        barData: {
            type: Array,
            default: () => {
                return [];
            },
        },
        unit: {
            type: String,
            default: () => {
                return "";
            },
        },
    },
    data() {
        return {};
    },
    mounted() {
        this.drawChart(this.id, this.title, this.barData, this.unit);
    },
    watch: {
        barData(newVal) {
            this.drawChart(this.id, this.title, this.barData, this.unit);
        },
    },
    methods: {
        random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        drawChart(id, title, data, unit) {
            let myChart = echarts.init(document.getElementById(id));
            window.onresize = function () {
                myChart.resize();
            };
            let x = [];
            let y = [];
            data.forEach((items, index) => {
                x.push(items.name);
                y.push(items.value);
            });
            myChart.setOption(
                {
                    title: {
                        text: title,
                        top: 20,
                        left: "center",
                        textStyle: {
                            color: "#fff",
                            fontSize: 20,
                        },
                    },
                    grid: {
                        right: "3%",
                        left: "8%",
                        bottom: "20%",
                        containLabel: false,
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: title + " <br/>{b}: {c} ({d}%)",
                    },
                    xAxis: {
                        data: x,
                        axisLine: {
                            lineStyle: {
                                color: "#3d5269",
                            },
                        },
                        axisLabel: {
                            color: "#fff",
                            interval:0, //强制显示文字
                            rotate:15,
                            fontSize: 12,
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                    yAxis: {
                        name: "单位:" + unit || '人',
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 12,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#3d5269",
                            },
                        },
                        axisLabel: {
                            color: "#fff",
                            fontSize: 12,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "#2d3d53",
                            },
                        },
                        // interval: 500,
                    },
                    series: [
                        {
                            type: "bar",
                            barWidth: 30,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color:
                                                    "rgb(" +
                                                    this.random(0, 255) +
                                                    "," +
                                                    this.random(0, 255) +
                                                    ",255)",
                                            },
                                            {
                                                offset: 1,
                                                color:
                                                    "rgb(" +
                                                    this.random(0, 255) +
                                                    "," +
                                                    this.random(0, 255) +
                                                    ",255)",
                                            },
                                        ],
                                        false
                                    ),
                                },
                            },
                            label: {
                                normal: {
                                    show: true,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    position: "top",
                                },
                            },
                            data: y,
                        },
                    ],
                },
                true
            );
        },
    },
};
</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>