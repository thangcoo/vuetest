<template>
  <el-dialog title="成绩考核" :visible.sync="visible" @close="$emit('update:dialogChartVisible',false)" width="80%">
    <el-tabs v-model="active" type="card" >
      <el-tab-pane label="总体成绩" name="all">
        <div ref="barchart" style="width:100%;height:600px;"></div>
      </el-tab-pane>
      <el-tab-pane label="我的成绩" name="mine">
        <div ref="radarChart" style="width:100%;height:100%;"></div>
      </el-tab-pane>
    </el-tabs>

  </el-dialog>
</template>
<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/radar'
  // 引入提示框和图例组件
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/markPoint'
  import 'echarts/lib/component/markLine'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/toolbox'
  export default{
    name:'bar-chart',
    props:{
      data:{
        type:Array
      },
      dialogChartVisible:{
        type:Boolean,
        default:false
      },
    },
    data(){
      return {
        visible:this.dialogChartVisible,
        chartdata:[],
        active:'all',

      }
    },
    watch:{
      dialogChartVisible(){
        this.visible=this.dialogChartVisible;
      },
      data(){
        this.chartdata=this.data;
      }
    },
    created(){
      this.$nextTick(function () {
        this.drawbarChart();
        this.drawRadar();
      });
    },
    methods:{
        drawbarChart(){
          console.log(this.data);
          var values=[];
          values=this.data.map(item=>item.student.username);
          console.log(values);
          // series=this.data.map(item=>item.score.performance);
          // console.log(series[0].performance);
          var option={
            legend:{
              data:['总分','课堂表现','作业情况','实验实践','出勤情况','其他','卷面成绩']
            },
            xAxis:{
              axisPointer:{
                show:true,
                type:'shadow',
              },
              data:values
            },
            yAxis:[
              {
                type: 'value',
                name: '总分/卷面',
                splitNumber:10,
                axisPointer:{
                  show:true,
                  type:'line',
                  lineStyle:{
                    type:'dashed'
                  },
                },
                max: 100,
                min: 0,
              },
              {
                type: 'value',
                name: '表现分',
                splitNumber:10,
                axisPointer:{
                  show:true,
                  type:'line',
                  lineStyle:{
                    type:'dashed'
                  },
                },
                max: 10,
                min: 0,
              }
            ],
            toolbox:{
              show:true,
              right:'200px',
              feature: {
                dataView: { //数据视图
                  show: true
                },
                magicType: {//动态类型切换
                  show:true,
                  type: ['bar', 'line'],
                },
                saveAsImage: {//保存图片
                  show: true
                },
              }
            },
            series:[{
              name:'总分',
              type:'bar',
              data:this.data.map(item=>{
                 return item.score.performance+item.score.operation
                   +item.score.experiment+item.score.attendance+item.score.other+item.score.paper;
              }),
              markPoint:{
                data:[
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'},
                  ]
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            },
              {
              name:'课堂表现',
              type:'bar',
              data:this.data.map(item=>item.score.performance*10)
            },
              {
                name:'作业情况',
                type:'bar',
                data:this.data.map(item=>item.score.operation*10)
              },
              {
                name:'实验实践',
                type:'bar',
                data:this.data.map(item=>item.score.experiment*10)
              },
              {
                name:'出勤情况',
                type:'bar',
                data:this.data.map(item=>item.score.attendance*10)
              },
              {
                name:'其他',
                type:'bar',
                data:this.data.map(item=>item.score.other*10)
              },
              {
                name:'卷面成绩',
                type:'bar',
                data:this.data.map(item=>item.score.paper)
              },
            ]
          }
          // var a=document.getElementById('barchart');
          var a=this.$refs.barchart;
          var barChart = echarts.init(a);

          barChart.setOption(option);
        },
      drawRadar(){
          var optionR={

          };
          var r=this.$refs.radarChart;
          var radar=echarts.init(r);
          radar.setOption(radar);
      }
    }
  }
</script>
<style>

</style>
