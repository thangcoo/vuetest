<template>
  <div id="echarts" style="width:100%;height:800px;">

  </div>
</template>
<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  // 引入提示框和图例组件
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/toolbox'
  export default{
    name:'bar-chart',
    props:{
      course: {
        type: Array,
        default:function () {
          return [{ courseName : '英语', students : [ 0 , 1 ] },{ courseName : '数学' , students : [ 0 , 1 , 2 ] } ];
        }
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.drawBarChart()
    },
    methods: {
      drawBarChart() {
        let xdata=[], values=[]
        xdata=this.course.map((item)=> item.courseName);
        values=this.course.map((item)=> item.students.length);
        const option={
          tooltip: {
            showContent:true,
            formatter:function (params) {
             return `${params[0].axisValue}</br>${params[0].marker}${params[0].seriesName}:${params[0].data}`;
        }
          },
          legend: {
            data:['人数']
          },
          xAxis: {
            data: xdata,
            axisPointer:{
              show:true,
              type:'shadow',

            }
          },
          yAxis: [{
            name:'人数',
            max: 10,
            splitNumber:1,
            axisPointer:{
                show:true,
                type:'line',
                lineStyle:{
                  type:'dashed'
                },
            }
          }],
          series: [{
            name: '人数',
            type: 'bar',
            data:values
          },
          ],
          toolbox:{
            show:true,
            right:'100px',
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
          }
        };
        var myChart=echarts.init(document.getElementById('echarts'));
        myChart.setOption(option);
      }
    }
  }
</script>
<style scoped>

</style>
