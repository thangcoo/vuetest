<template>
  <div class="add-read">
    <el-button v-if="types=='add'" type='primary' @click="handleAdd()">新增</el-button>
    <el-button v-else  type='text'  size="mini" @click="handleRead(index,row)">查看</el-button>
    <el-dialog :title="types=='add'?'新增': '查看'" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" >
        <el-form-item label="课程名" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="课程名" :disabled="read"></el-input>
        </el-form-item>
        <el-form-item label="上课老师" prop="teacher">
          <el-select v-model="form.teacher" placeholder="上课老师" :disabled="read">
            <el-option  v-for="item in teachers" :value="item.username" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学分" prop="score">
          <el-input type="number" v-model="form.score" autocomplete="off" placeholder="学分" :disabled="read"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.other" autocomplete="off" placeholder="备注" :disabled="read"></el-input>
        </el-form-item>
        <div v-if="show">
          <el-form-item label="选课学生" class="last"></el-form-item>
          <p class="students"><span v-for="item in students">{{item.username}}</span></p>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHandler('form')">取 消</el-button>
        <el-button v-if="types=='add'" type="primary" @click="submitHandler('form')">确 定</el-button>
      </div>
    </el-dialog>
    <score-view v-if="showChart" :data="chartData" :dialogChartVisible.sync="dialogChartVisible"></score-view>
  </div>

</template>
<script>
  import  {getList} from "@/api/table";
  import {getchartScore} from '@/api/score'
  import  {addCourse} from "@/api/course";
  import {mapGetters} from  'vuex'
  import scoreView from './scoreView'
  export default {
    name:'add-read',
    props:{
      types:{
        type:String,
        required:true
      },
      row:{
        type:Object,
        default:function () {
          return {};
        }
      },
      index:{
        type:Number,
        default:0
      }
    },
   computed:{
     ...mapGetters([
       'roles'
     ])
   },
    data(){
      return {
        dialogFormVisible:false,
        dialogChartVisible:false,
        teachers:[],
        students:[],
        chartData:[
      //   {
      //     course:{courseName:'hhhh',_id:'5d1c01ddab1b3251228b9897'},
      //    score:{attendance: 3,experiment: 5,operation: 5,other: 5,paper: 45,performance: 4 },
      //    student:{number: "000001",username: "1", _id: "5d146690ab1b3251228b9881"},
      //     teacher: "5d1b57e9ab1b3251228b9891",
      //     _id: "5d1ca672ab1b3251228b98b2"
      // }
          ],
        read:false,
        form:{
          name:'',
          teacher:'',
          score:'',
          other:'',
        },
        rules:{
          name: [
            { required: true, message: '课程名不能为空', trigger: 'blur' }
          ],
          teacher:[
            { required: true, message: '请选择上课老师', trigger: 'change' }
          ],
          score:[{ required: true, message: '学分不能为空',trigger: 'blur',}],
        },
        show:false,//是否显示选课学生
        showChart:false
      }
    },
    created(){
      this.getTeachers();
    },
    components:{
      scoreView
    },
    methods:{
      getTeachers(){
        getList({role:'1'}).then((response)=>{
          this.teachers=response.data.userLists;
        });
      },
      // getchartScore(data){
      //   getchartScore(data).then(response=>{
      //     this.chartData=response.data.scoreLists;
      //   });
      // },
      submitHandler(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            var teacher=this.teachers.filter(item=>{
              return item.username==this.form.teacher;
            })
            var data={
              courseName:this.form.name,
              credit:this.form.score,
              remark:this.form.other,
              teacher:teacher[0]._id
            }
            addCourse(data).then((response)=>{
              if(response.code==1){
                this.$emit('add');
                this.cancelHandler(form);
                this.$message({
                  type: 'success',
                  message: `操作成功`
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleRead(index,row){
        if(row.students.length>0){
          this.show=true;
        }
        if(row.status=='2'){
          //已开课的查看
          getchartScore({course:row._id}).then(response=>{
            this.chartData=response.data.scoreLists;
            this.showChart=true;
            this.dialogChartVisible=true;
          });
        }else{
          //未开课查看
          this.dialogFormVisible=true;
          this.read=true;
          this.form.name=row.courseName;
          this.form.teacher=row.teacher.username;
          this.form.score=row.credit;
          this.form.other=row.remark;
          getList({role:'2'}).then((response)=>{
            this.students= response.data.userLists.filter(item=>{
              for(var i=0;i<row.students.length;i++){
                if(item._id==row.students[i]){
                  return true;
                }
              }
            });
          });
        }
      },
      handleAdd(){
        this.dialogFormVisible=true;
      },
      cancelHandler(form){
        this.$refs[form].resetFields();
        this.dialogFormVisible=false;
      }
    }

  }
</script>
<style>
  .add-read{
    display:inline-block;
    margin-right:8px;
    margin-left:8px;
  }
  .add-read .el-dialog__header,.el-form-item__content{
    text-align: left;
  }
  .add-read .el-dialog__body{
    padding-left:10px;
  }
  .last{
    margin-bottom: 0;
  }
  .students{
    margin:0 0 0 50px;
    text-align: left;
  }
  .students span{
    padding-left:10px;
  }
</style>
