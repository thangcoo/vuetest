<template>
  <div class="dashboard-container">
     <div v-if="roles=='2'" class="student">
         <p>用户名:{{name}}</p>
         <p>角色:{{roles}}</p>
         <p>学号:{{number}}</p>
     </div>
    <div v-else>
      <div class="dashboard-num">
        <el-row :gutter="20">
          <el-col :xs=24 :sm="8" v-for="item in numData">
            <el-card shadow="always">
              <div class="grid-content">
                <div class="imgLeft" :style="`background-color:${item.bg}`">
                  <svg-icon :iconClass="item.icon"></svg-icon>
                </div>
                <div class="content">
                  <div class="num" ><span>{{item.num}}</span></div>
                  <div class="course">{{item.course}}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="course" style="margin-top:30px;">
        <el-card>
          <echart :course="course" v-if="flag"></echart>
        </el-card>
      </div>
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import {getHomedata} from '@/api/chart'
  import {svgIcon} from '@/components/SvgIcon'
  import Echart from '@/components/echarts'
export default {
  name: 'Dashboard',
  data(){
    return{
      numData:[
        {
          bg:'#2c8cf0',
          icon:'organization',
          course:'课程数',
          num:0
        },
        {
          bg:'#18be6c',
          icon:'xiangmu',
          course:'老师数',
          num:0
        },
        {
          bg:'#fe9900',
          icon:'chakancishu',
          course:'学生数',
          num:0
        }
      ],
      course:[],
      flag:false,
    }
  },
  computed:{
    ...mapGetters([
      'roles','name','number'
    ])
  },
  components:{
    Echart
  },
  created(){
    this.getHomeData();
  },
  methods:{
    getHomeData(){
      getHomedata().then((response)=>{
        var res=response.data;
        this.numData[0].num=res.number.courseNum;
        this.numData[1].num=res.number.teacherNum;
        this.numData[2].num=res.number.studentNum;
         this.course=res.course;
         this.flag=true;
         console.log(this.course);
      })
    }
  }
}
</script>
<style lang="scss" >
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
div.el-card__body{
  padding:0;
}
.grid-content {
  border-radius: 4px;
  height: 120px;
  width:100%;
  display:table;
}
  .imgLeft{
    width:36%;
    height:100%;
    text-align: center;
    display:table-cell;
    vertical-align: middle;
    background:#2c8cf0;
  }
.grid-content .imgLeft .svg-icon{
    width:100%;
    color:#fff;
    font-size:36px;
}
.content{
  height:100%;
  text-align: center;
  font-size:16px;
  line-height:24px;
}
.content .num{
  width:100%;
  height:80%;
  font-size:40px;
  display:table;
}
  .num span{
    display: table-cell;
    vertical-align: middle;
  }
  .student p{
    font-size:30px;
    margin:10px 0;
  }
</style>
