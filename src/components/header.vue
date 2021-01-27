<template>
  <div class="header">
    <!-- <div class="back-btn" @click="toBack" v-if="back"><i class="el-icon-coin" style="font-size:30px"></i></div> -->
    <h3 class="title" v-html="title"></h3>
    <span class="time">{{date | formaDate }}</span>
  </div>
</template>

<script>
let padaDate = function(value){
      return value<10 ? '0'+value : value;
   };
// import { date } from "assets/js/util";
export default {
  props: {
    title: {
      type: String,
      default: "2020年8月重庆招聘数据分析"
    },
    back:{
      type:Boolean,
      default:true,
    }
  },
  data() {
    return {
      date: new Date()
    };
  },
  filters: {
    //设置一个函数来进行过滤
    formaDate: function(value) {
      //创建一个时间日期对象
      let date = new Date();
      let year = date.getFullYear(); //存储年
      let month = padaDate(date.getMonth() + 1); //存储月份
      let day = padaDate(date.getDate()); //存储日期
      let hours = padaDate(date.getHours()); //存储时
      let minutes = padaDate(date.getMinutes()); //存储分
      let seconds = padaDate(date.getSeconds()); //存储秒
      //返回格式化后的日期
      return (year +"." +month +"." +day +"  " +hours +":" +minutes );
    }
  },
  mounted() {
    //创建定时器更新时间
    let _this = this;
    this.timeId = setInterval(function() {
      _this.date = new Date();
    }, 60000);
  },
  beforeDestroy: function() {
    //实例销毁前青出于定时器
    if (this.timeId) {
      clearInterval(this.timeId);
    }
  },
  methods: {
    toBack(){
          this.$router.go(-1);//返回上一层
      }
    //显示当前时间（年月日时分秒）
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 107px;
  background: url(../assets/img/header.png) center no-repeat;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
}
.back-btn{
  position: absolute;
  left: 30px;
  font-size: 22px;
  vertical-align: middle;
  color: #fff;
  cursor: pointer;
}
.back-btn>img{
  margin-left: 40px;
  margin-right: 10px;
  vertical-align: middle;
}
.title {
  width: 540px;
  height: 100%;
  margin: auto;
  line-height: 107px;
  font-size: 40px;
  text-align: center;
  background: linear-gradient(bottom, #0c95fe, #fff);
  -webkit-background-clip: text;
  color: transparent;
}
.time {
  position: absolute;
  right: 40px;
  height: 107px;
  line-height: 107px;
  font-size: 26px;
  font-weight: bold;
  color: #d2e4ff;
}
</style>