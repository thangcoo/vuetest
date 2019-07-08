<template>
  <div class="tableWrap">
  <add-update types="add" @update="updata"></add-update>
  <el-table
    :data="userLists" border  style="width: 100%" class="userLists" >
    <el-table-column prop="number" label="代号"  align="center"></el-table-column>
    <el-table-column prop="username" label="用户名" align="center"></el-table-column>
    <el-table-column prop="password" label="密码"align="center"></el-table-column>
    <el-table-column prop="role" label="角色" align="center">
      <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" :type="scope.row.role | filterType">{{ scope.row.role | filterRole}}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column label="备注" align="center"> </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope" >
          <add-update types="update" :row="scope.row" :index="scope.$index" @update="updata"></add-update>
        <el-button type='text' :disabled="scope.row.username == 'admin' " size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import {getList,delet} from '@/api/table'
  import addUpdate from './user_add-or-update'
  export  default{
   name:'user',
    data(){
     return {
       size:10,
       current:1,
       userLists:[],
       total:0,
       dialogFormVisible:false
     }
    },
   components:{
     addUpdate
   },
    created(){
     this.getList();
    },
    filters:{
      filterRole(value){
        return  value=='0' ? '管理员': value=='1' ? '老师': '学生';
      },
      filterType(value){
        return  value=='0' ? 'danger': value=='1' ? 'warning': '';
      }
    },
    methods:{
     getList(){
        getList({pageNum:this.current,pageSize:this.size}).then((response)=>{
          console.log(response.data.userLists);
          this.userLists=response.data.userLists;
          this.total=response.data.totalPage;
        });
     },
      handleDelete(index,row){
       // console.log(index);
       //  console.log(row);
        this.$confirm(`确定对id=${row._id}进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          delet({userId:row._id}).then((response)=>{
            this.$message({
              type: 'success',
              message: response.data
            });
            this.getList();
          });

        });

      },
      updata(){
       this.getList();
      },
      handleSizeChange(val){
       this.size=val;
       this.getList();
      },
      handleCurrentChange(val){
       console.log(val);
       this.current=val;
       this.getList()
      }
    },
  }
</script>
<style>
  .userLists{
    margin-top:20px;
  }
</style>
