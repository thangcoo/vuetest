<template>
   <div class="tableWrap">
     <el-table
       :data="courseLists" border  style="width: 100%" class="courseLists" >
       <el-table-column prop="_id" label="ID"  align="center"></el-table-column>
       <el-table-column prop="courseName" label="课程名" align="center"></el-table-column>
       <el-table-column label="状态"align="center">
         <template slot-scope="scope" >
           <span>{{scope.row.status | filterStatus}}</span>
         </template>
       </el-table-column>
       <el-table-column prop="teacher.username" label="老师" align="center"></el-table-column>
       <el-table-column prop="credit" label="学分" align="center"> </el-table-column>
       <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
       <el-table-column label="操作" align="center" class="manu">
         <template slot-scope="scope" >
           <el-button type='text'  size="mini" @click="handlePublish(scope.$index, scope.row)">{{scope.row.status | filterState}}</el-button>
           <add-read types="read" :row="scope.row" :index="scope.$index" ></add-read>
           <el-button type='text' size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
   </div>
</template>
<script>
  import {getCourses} from '@/api/course'
  export default {
    data(){
      return {
        courseLists:[]
      }
    },
    mounted(){
      this.getTeachCour();
    },
    methods:{
      getTeachCour(){
        getCourses({id:this.$store.getters.userId}).then(responose=>{
          // console.log(responose);
          this.courseLists=responose.data.courseLists;
          console.log(this.courseLists)
        });
      }
    }
  }
</script>
<style >

</style>
