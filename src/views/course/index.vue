<template>
  <div class="tableWrap">
    <add-read v-if="roles=='0'" types="add" @add="getCourses" class="btn"></add-read>
    <el-table
      :data="courseLists" border  style="width: 100%" class="courseLists" >
      <el-table-column prop="_id" label="ID" ></el-table-column>
      <el-table-column prop="courseName" label="课程名"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" >
          <span>{{scope.row.status | filterStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="teacher.username" label="老师"></el-table-column>
      <el-table-column prop="credit" label="学分"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作" class="manu" width="150px">
        <template slot-scope="scope" >
          <!--管理员：发布/取消发布-->
          <el-button v-if="roles=='0'" type='text'  size="mini" @click="handlePublish(scope.$index, scope.row)">{{scope.row.status | filterState0}}</el-button>
          <!--老师：开课/考核-->
          <el-button v-if="roles=='1'" type='text'  size="mini" @click="handleStart(scope.$index, scope.row)">{{scope.row.status | filterState1}}</el-button>
          <score-update :data="scoreLists" :dialogTableVisible.sync="dialogTableVisible"></score-update>
          <!--学生：选课/取消选课-->
          <el-button v-if="roles=='2' && $route.name=='selfCourse'" type='text'  size="mini" @click="updataCour(scope.row)">{{scope.row.status | filterState2}}</el-button>
          <el-button v-if="roles=='2' && $route.name=='unselfCourse'" type='text'  size="mini" @click="updataCour(scope.row)">选课</el-button>
          <!--查看-->
          <add-read types="read" :row="scope.row" :index="scope.$index" ></add-read>
          <!--删除-->
          <el-button v-if="roles=='0'" type='text' size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {getCourses,updateCourse,delCourse} from '@/api/course'
  import {getScore} from '@/api/score'
  import addRead from './course_add-read'
  import scoreUpdate from './scoreUpdate'
  export  default {
    name:'course',
    data(){
      return {
        size:10,
        current:1,
        total:0,
        courseLists:[],
        row:{},
        scoreLists:[],
        dialogTableVisible:false,
        assess:false
      }
    },
    components:{
      addRead,scoreUpdate
    },
    computed:{
      ...mapGetters([
        'roles','userId'
      ]),
    },
    created(){
      this.getCourses(this.size);
    },
    filters:{
      filterStatus(val){
        return val==0 ? '未发布' : val==1?'已发布': '已开课';
      },
      filterState0(val){
        return val==0 ? '发布' : val==1?'取消发布': '';

      },
      filterState1(val){
        return val==1? '开课' : '考核';

      },
      filterState2(val){
        return  val==1? '取消选课' : '';

      }
    },
    methods:{
      getCourses(size){
        getCourses({pageSize:size}).then((response)=>{
              if(this.roles=='2' ){
                    if(this.$route.name=='selfCourse'){
                      this.courseLists=response.data.courseLists.filter(item=>item.students.includes(this.userId));
                    }else{
                      this.courseLists=response.data.courseLists.filter(item=>!item.students.includes(this.userId));
                    }
                   this.total=this.courseLists.length;
              }else{
                this.courseLists=response.data.courseLists;
                this.total=response.data.totalPage;
              }
        });
      },
      getScore(id){
        getScore(id).then(response=>{
          this.scoreLists=response.data.scoreLists;
          this.scoreLists.map(item=>{
            this.$set(item, 'edit', false);
          })
        });
      },
      successHandler(res){
        if(res.code==1){
          this.getCourses(this.size);
          this.$message({
            type: 'success',
            message: `操作成功`
          });
        }
      },
      handlePublish(index,row){
          if(row.status==0){
          row.status=1
        }else{
          row.status=0;
        }
        this.updataCour(row);
      },
      //老师账号操作开课及考核
      handleStart(index,row){
        // console.log(row);
        if(row.students.length==0){
          this.$message({
            type: 'error',
            message: `没有学生选课不能开课`
          });
        }else if(row.status==1 ){
          row.status=2;
          this.updataCour(row);
        } else{
          this.dialogTableVisible=true;
          this.getScore({course:row._id});
          // console.log(this.scoreLists)
          // this.$nextTick(()=>{
          //   this.getScore({course:row._id});
          // });

        }
      },
      updataCour(row){
        var data;
        var flag=this.$route.name=='unselfCourse'? 'add':'remove';
        if(this.roles=='2'){
              data={
              courseId:row._id,
              userId:this.userId,
              flag:flag
            }
        }else{
          data={
            courseId:row._id,
            status:row.status,
            remark:row.remark,
            teacher:row.teacher._id,
          }
        }
        updateCourse(data).then((response)=>{
          this.successHandler(response);
        });
      },
      // saveScore(row){
      //   const data={
      //     scoreId:row._id,
      //     score:row.score,
      //   }
      //   updateScore(data).then(response=>{
      //          if(response.code==1){
      //            this.$message({
      //              type: 'success',
      //              message: `操作成功`
      //            });
      //            row.edit=false;
      //          }
      //   });
      // },
      handleDelete(index,row){
        this.$confirm(`确定对id=${row._id}进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          delCourse({courseId:row._id}).then((response)=>{
           this.successHandler(response);
          });

        });
      },
      handleSizeChange(val){
        this.size=val;
        this.getCourses(this.size);
      },
      handleCurrentChange(val){
        // console.log(val);
        this.current=val;
        this.getCourses(this.size)
      },
    }
  }
</script>
<style >
.btn{
  margin-bottom:20px;
}
  .manu .el-button{
    padding:0 10px;
  }
  .scoreDial .el-table td{
   border-right:none;
  }
  .scoreDial .el-table th{
    border-right:none;
  }
  .sum{
    color:#98c23a;
  }
  .save{
    display:inline-block;
  }
  .el-dialog__header{
    text-align: left;
  }
</style>
