<template>
  <el-dialog title="成绩考核" :visible.sync="visible" @close="$emit('update:dialogTableVisible',false)" width="95%" class="scoreDial">
    <el-table :data="scoreLists">
      <el-table-column property="student.number" label="学号" width="150"></el-table-column>
      <el-table-column property="student.username" label="姓名" width="200"></el-table-column>
      <el-table-column  label="课堂表现(6分)">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.score.performance}}</span>
          <el-input-number v-else v-model="scope.row.score.performance" size="mini" :min="0" :max="6"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="作业情况(6分)">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.score.operation}}</span>
          <el-input-number v-else v-model="scope.row.score.operation" size="mini" :min="0" :max="6"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="实验实践(6分)">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.score.experiment}}</span>
          <el-input-number v-else v-model="scope.row.score.experiment" size="mini" :min="0" :max="6"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="出勤情况(6分)">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.score.attendance}}</span>
          <el-input-number v-else v-model="scope.row.score.attendance" size="mini" :min="0" :max="6"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="其他(6分)">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.score.other}}</span>
          <el-input-number v-else v-model="scope.row.score.other" size="mini" :min="0" :max="6"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="卷面成绩(70分)">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{scope.row.score.paper}}</span>
          <el-input-number v-else v-model="scope.row.score.paper" size="mini" :min="0" :max="70" :step="5"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column  label="总分">
        <template slot-scope="scope" >
          <span  class="sum">{{sum(scope.row.score)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" >
          <el-button  v-if="!scope.row.edit" size="mini" @click="scope.row.edit=true">编辑</el-button>
          <el-button  v-if="scope.row.edit" type="primary" size="mini" @click="saveScore(scope.row)">保存</el-button>
          <el-button  v-if="scope.row.edit" size="mini" @click="scope.row.edit=false">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
  import {updateScore} from '@/api/score'
  export default{
    props:{
      data:{
        type:Array,
      },
      dialogTableVisible:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        visible:this.dialogTableVisible,
        scoreLists:this.data
      }
    },
    watch:{
      dialogTableVisible(){
        this.visible=this.dialogTableVisible;
      },
      data(){
        // console.log(this.data);
        this.scoreLists=this.data;
      }
    },
    methods:{
      sum(score){
        return score.performance+ score.operation + score.experiment +score.attendance + score.other +score.paper;
      },
      saveScore(row){
        const data={
          scoreId:row._id,
          score:row.score,
        }
        updateScore(data).then(response=>{
          if(response.code==1){
            this.$message({
              type: 'success',
              message: `操作成功`
            });
            row.edit=false;
          }
        });
      },
    }
  }
</script>
<style>

</style>
