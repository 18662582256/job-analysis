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
        console.log("11111111111",this.pieData)
        this.pieDataChart(this.id, this.title, this.pieData, this.unit);
    },
    watch: {
        pieData(newVal) {
            this.pieDataChart(this.id, this.title, this.pieData, this.unit);
        },
    },
    methods:{
        pieDataChart(id, title, data, unit){
            let myChart = echarts.init(document.getElementById(id));
            let colors=["#166eff","#69a0fd","#9ec2ff","#c4daff","#c8cbd2","#b0b7c4","#98a4b9","#778398","#ffc0a9","#ff9898"];
            let x=[];
            data.forEach((items,index)=>{
                x.push(items.name)
            });
            window.onresize = function () {
                myChart.resize();
            };
            myChart.setOption({
                    tooltip: {
                        trigger: "item",
                        formatter: title + " <br/>{b}: {c} ({d}%)",
                    },
                    legend: {
                        orient:'vertical',
                        top: 25,
                        right:10,
                        data:x,
                        textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 14
                        }
                    },
		series: [{
			type: 'pie',
			radius: '65%',
			center: ['50%', '63%'],
			label: { //饼图图形上的文本标签
				normal: {
					show: true,
					textStyle: {
						fontWeight: 700,
						fontSize: 13 //文字的字体大小
					},
					formatter: '{b}',
				}
			},
			data: data
		}]
                })
    }
}
}
</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>