<template>
    <div class="job-analysis">
        <div id="particles"></div>
        <my-header></my-header>
        <div class="content">
            <el-row>
                <el-col :span="7">
                    <div class="components">
                        <span class="border border-tl"></span>
                        <span class="border border-tr"></span>
                        <span class="border border-bl"></span>
                        <span class="border border-br"></span>
                        <div class="page-item">
                            <edu-pie :id="'xkPie'" :title="'学历分布统计'" :pieData="eduData"  ></edu-pie>
                        </div>
                    </div>
                    <div class="components">
                        <span class="border border-tl"></span>
                        <span class="border border-tr"></span>
                        <span class="border border-bl"></span>
                        <span class="border border-br"></span>
                        <div class="page-item">
                            <company-bar :id="'company'" :title="'招聘人数TOP10'" :barData="companyData.slice(0,10)"></company-bar>
                        </div>
                    </div>
                    <div class="components mb-0">
                        <span class="border border-tl"></span>
                        <span class="border border-tr"></span>
                        <span class="border border-bl"></span>
                        <span class="border border-br"></span>
                        <div class="page-item">
                             <company-bar :id="'mapDataTop'" :title="'区域排行TOP10'" :barData="mapData.slice(0,10)"></company-bar>
                        </div>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div id="map"></div>
                    <div class="tables">
                        <span class="border border-tl"></span>
                        <span class="border border-tr"></span>
                        <span class="border border-bl"></span>
                        <span class="border border-br"></span>
                        <div class="page-item">
                            <app-table :tableData="tableData"></app-table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="components ml-15">
                        <span class="border border-tl"></span>
                        <span class="border border-tr"></span>
                        <span class="border border-bl"></span>
                        <span class="border border-br"></span>
                        <div class="page-item">
                            <exper-pie :id="'exper'" :title="'学历要求'" :pieData="experrienceLowestData"></exper-pie>
                        </div>
                    </div>
                    <div class="components ml-15">
                        <span class="border border-tl"></span>
                        <span class="border border-tr"></span>
                        <span class="border border-bl"></span>
                        <span class="border border-br"></span>
                        <div class="page-item">
                            <company-bar :id="'industryTop'" :title="'行业排行TOP10'" :barData="industryData.slice(0,10)"></company-bar>
                        </div>
                    </div>
                    <div class="components mb-0 ml-15">
                        <span class="border border-tl"></span>
                        <span class="border border-tr"></span>
                        <span class="border border-bl"></span>
                        <span class="border border-br"></span>
                        <div class="page-item">
                            <exper-pie :id="'position'" :title="'职位TOP5'" :pieData="positionData.slice(0,5)"></exper-pie>
                        </div>
                    </div>
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>

<script>
import particlesJs from "particles.js";
import particlesConfig from "../assets/data/particles.json";
import job from "../assets/data/job.json";
import echarts from "echarts";
import chongqing from "../assets/data/chongqing.json";

import MyHeader from "../components/header";
import eduPie from "./modules/pieCharts";
import companyBar from "./modules/charts";
import experPie from "./modules/experPie";
import table from "./modules/tables"
export default {
    data() {
        return {
            workAddr:[],//工作地点
            company:[],//公司
            salaryLowest:[],//最低薪资
            salaryHighest:[],//最高薪资
            experrienceLowest:[],//工作经验
            reqLowest:[],//招聘人数
            position:[],//职位
            industry:[],//行业
            edu:[],//学历要求
            // 地图数据
            mapData: [],
            // 学历数据
            eduData:[],
            // 招聘数量统计
            companyData:[],
            // 工作经验
            experrienceLowestData:[],
            // 职位
            positionData:[],
            // 行业
            industryData:[],
            // 表格
            tableData:[],


        };
    },
    components: {
        MyHeader,
        eduPie,
        companyBar,
        experPie,
        "app-table":table
    },
    watch: {
        mapData(newVal) {
           this.initMap(this.mapData);
        },
    },
    created() {
        echarts.registerMap("chongqing", chongqing);
    },
    mounted() {
        particlesJS("particles", particlesConfig);
        this.initMap(this.mapData);
        console.log("json---------------------",chongqing);
        this.tableData=job;
        job.forEach((items,index)=>{
            this.workAddr.push(items.workAddr);
            this.company.push(items.company);
            this.edu.push(items.edu);
            this.position.push(items.position);
            this.experrienceLowest.push(items.experrienceLowest);
            this.industry.push(items.industry);
        });
        this.workAddr=this.unique(this.workAddr);
        this.company=this.unique(this.company);
        this.edu=this.unique(this.edu);
        this.position=this.unique(this.position);
         this.experrienceLowest=this.unique(this.experrienceLowest);
         this.industry=this.unique(this.industry);
        console.log("------------",this.edu);
        // 地图数据处理
        chongqing.features.forEach((items, index) => {
            this.mapData.push({
                name:"",
                value:0,
            })
            this.mapData[index].name=items.properties.name;
            this.mapData[index].value=job.filter((jobs, index) =>jobs.workAddr==items.properties.name).length;
        });
        // 学历数据处理
        this.edu.forEach((items,index)=>{
            this.eduData.push({
                name:items,
                value:0
            });
            this.eduData[index].value=job.filter((edus, index) =>edus.edu==items).length
        });
        // 公司招聘数量统计
        this.company.forEach((items,index)=>{
            this.companyData.push({
                name:items,
                value:0
            });
            this.companyData[index].value=job.filter((company, index) =>company.company==items).length
        });
        // 工作经验统计
        this.experrienceLowest.forEach((items,index)=>{
            this.experrienceLowestData.push({
                name:items==0?'不限':items+'年以上',
                value:0
            });
            this.experrienceLowestData[index].value=job.filter((experrienceLowest, index) =>experrienceLowest.experrienceLowest==items).length
        });
        // 职位统计
        this.position.forEach((items,index)=>{
            this.positionData.push({
                name:items,
                value:0
            });
            this.positionData[index].value=job.filter((position, index) =>position.position==items).length
        });
        // 行业
        this.industry.forEach((items,index)=>{
            this.industryData.push({
                name:items,
                value:0
            });
            this.industryData[index].value=job.filter((industrys, index) =>industrys.industry==items).length
        });
        this.companyData = this.companyData.sort(function (a, b) {
                return b.value - a.value;
        });
        this.mapData = this.mapData.sort(function (a, b) {
                return b.value - a.value;
        });
         this.positionData = this.positionData.sort(function (a, b) {
                return b.value - a.value;
        });
         this.industryData = this.industryData.sort(function (a, b) {
                return b.value - a.value;
        });
        console.log("------------industryData",this.industryData);
    },
    methods: {
        //   数组去重
        unique(arr) {
            return Array.from(new Set(arr));
        },
        // 地图初始化
        initMap(mapData) {
            let myChart = echarts.init(document.getElementById("map")); //这里是为了获得容器所在位置
            window.onresize = myChart.resize;
            let option = {
                // title: {
                //     text: "全市店铺分布情况",
                //     top: 30,
                //     right: 160,
                //     textStyle: {
                //         color: "#fff",
                //         fontSize: 20,
                //     },
                // },
                // 进行相关配置
                tooltip: {
                    trigger: "item",
                },
                visualMap: {
                    min:110,
                    max:0,
                    right: "3%",
                    bottom: "0%",
                    inRange: {
                        color: ["#c9e7ff", "#006ec6"],
                    },
                    textStyle: {
                        color: "#fff",
                    },
                },
                geo: {
                    // 这个是重点配置区
                    map: "chongqing", // 表示重庆地图
                    roam: false,
                    width: "100%",
                    height: "100%",
                    label: {
                        normal: {
                            show: false, // 是否显示对应地名
                            textStyle: {
                                color: "rgba(0,0,0,0.4)",
                            },
                        },
                    },
                    itemStyle: {
                        normal: {
                            areaColor: "rgba(255, 255, 255, 0)",
                            borderColor: "rgba(255, 255, 255, 1)",
                            borderWidth: 2,
                        },
                        emphasis: {
                            areaColor: "#f87271",
                            borderWidth: 1,
                            borderColor: "rgba(255, 255, 255, 1)",
                        },
                    },
                },
                series: [
                    {
                        type: "scatter",
                        coordinateSystem: "geo", // 对应上方配置
                    },
                    {
                        type: "map",
                        geoIndex: 0,
                        data: mapData,
                    },
                ],
            };
            myChart.setOption(option, true);
            // this.myChart.on("click", (params) => {
            //     this.value = params.name;
            //     this.myChart.setOption(option, true);
            // });
        },
        
    },
};
</script>

<style scoped>
.job-analysis {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/img/bg.png) center no-repeat;
    background-size: cover;
}
#particles {
    position: absolute;
    width: 100%;
    height: 100%;
}
.content {
    width: 100%;
    height: calc(100% - 107px);
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
}
#map {
    width: 100%;
    height: calc(100% / 3 * 2);
    /* background-color: aliceblue; */
}
.tables{
    position: relative;
    width: 100%;
    height: calc(100% / 3 - 15px);
    margin-top: 15px;
    border:1px solid rgb(87, 52, 216);
    box-sizing: border-box;
    /* background-color: aliceblue; */
}
.components{
    position: relative;
    width:calc(100% - 15px);
    height: calc(100% / 3 - 10px);
    margin-bottom: 15px;
    border:1px solid rgb(87, 52, 216);
    box-sizing: border-box;
}
.el-row,
.el-col{
    height: 100%;
}
.components.mb-0{
    margin-bottom: 0;
}
.components.ml-15{
    margin-left: 15px;
}
.border{
    position: absolute;
    width: 10px;
    height: 10px;
    border:1px solid #fff;
}
.border.border-tl{
    left: 0;
    top:0;
    border-right: none;
    border-bottom: none;
}
.border.border-tr{
    right: 0;
    top:0;
    border-left: none;
    border-bottom: none;
}
.border.border-bl{
    left: 0;
    bottom:0;
    border-right: none;
    border-top: none;
}
.border.border-br{
    right: 0;
    bottom:0;
    border-left: none;
    border-top: none;
}
.page-item{
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>