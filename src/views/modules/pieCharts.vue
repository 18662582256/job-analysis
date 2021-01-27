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
        pieData: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {};
    },
    mounted() {
        this.drawChart(this.id, this.title, this.pieData);
    },
    watch: {
        pieData(newVal) {
            this.drawChart(this.id, this.title, this.pieData);
        },
    },
    methods: {
        random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        drawChart(id, title, data) {
            let myChart = echarts.init(document.getElementById(id));
            let total = 0;
            let color = [];
            let echartData = data;
            echartData.forEach((items, index) => {
                total += items.value;
                color.push("rgb("+this.random(0,255)+","+this.random(0,255)+",255)");
            });
            window.onresize = function () {
                myChart.resize();
            };
            myChart.setOption(
                {
                    color: color,
                    tooltip: {
                        trigger: "item",
                        formatter: title + " <br/>{b}: {c} ({d}%)",
                    },
                    title: [
                        {
                            text: "{name|" + title + "}\n{val|" + total + "}",
                            top: "center",
                            left: "center",
                            textStyle: {
                                rich: {
                                    name: {
                                        fontSize: 14,
                                        fontWeight: "normal",
                                        color: "#fff",
                                        padding: [10, 10],
                                    },
                                    val: {
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        color: "#fff",
                                    },
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            type: "pie",
                            radius: ["60%", "90%"],
                            center: ["50%", "50%"],
                            data: echartData,
                            hoverAnimation: true,
                            itemStyle: {
                                normal: {
                                    borderColor: "#fff",
                                    borderWidth: 2,
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false,
                                },
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: "center",
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: "30",
                                        fontWeight: "bold",
                                    },
                                },
                            },
                            //     labelLine: {
                            //         normal: {
                            //             length: 20,
                            //             length2: 100,
                            //             lineStyle: {
                            //                 color: "#fff",
                            //             },
                            //         },
                            //     },
                            //     label: {
                            //         normal: {
                            //             formatter: (params) => {
                            //                 return (
                            //                     "{icon|●}{name|" +
                            //                     params.name +
                            //                     "}{value|" +
                            //                     params.value +
                            //                     "}"
                            //                 );
                            //             },
                            //             padding: [0, -100, 25, -100],
                            //             rich: {
                            //                 icon: {
                            //                     fontSize: 16,
                            //                 },
                            //                 name: {
                            //                     fontSize: 14,
                            //                     padding: [0, 10, 0, 4],
                            //                     color: "#fff",
                            //                 },
                            //                 value: {
                            //                     fontSize: 18,
                            //                     fontWeight: "bold",
                            //                     color: "red",
                            //                 },
                            //             },
                            //         },
                            //     },
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