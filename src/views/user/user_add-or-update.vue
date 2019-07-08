<template>
  <div class="add-update">
    <el-button v-if="types=='add'" type='primary' @click="handleAdd()">新增</el-button>
    <el-button v-else  type='text'  size="mini" :disabled="row.username=='admin'" @click="handleEdit(index,row)">修改</el-button>
    <el-dialog :title="types=='add'?'新增': '修改'" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" >
        <el-form-item label="代号" prop="num">
          <el-input v-model="form.num" autocomplete="off" placeholder="代号"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="登录账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :required="types=='add'">
          <el-input type="password" v-model="form.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass" :required="types=='add'">
          <el-input type="password" v-model="form.checkpass" autocomplete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择">
            <el-option label="老师" value="1"></el-option>
            <el-option label="学生" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHandler('form')">取 消</el-button>
        <el-button type="primary" @click="submitHandler('form',row)">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import  {validatePassword} from '@/utils/validate'
  import  {update,register} from "@/api/table";

  export default {
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
    name:'add-update',
    data(){
      var validatecheckPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('确认密码不能为空'));
          } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        }
       return {
         dialogFormVisible:false,
         form:{
           num:'',
           name:'',
           password:'',
           checkpass:'',
           role:'',
         },
         rules:{
           num: [
             { required: true, message: '代号不能为空', trigger: 'blur' }
           ],
           name:[
             { required: true, message: '用户名不能为空', trigger: 'blur' }
           ],
           password:[{ trigger: 'blur', validator: validatePassword }],
           checkpass:[{trigger: 'blur', validator: validatecheckPass }],
           role:[
             { required: true, message: '角色不能为空', trigger: 'change' }
           ]
         },
      }
    },
    methods:{
      submitHandler(form,row){
        this.$refs[form].validate((valid) => {
          if (valid) {
            var data={
              username:this.form.name,
              password:this.form.password,
              role:this.form.role,
              number:this.form.num
            }
            if(this.types=='update'){//修改
              data.userId=row._id;
              update(data).then((response)=> {
                this.successHandler(response, form);
              })
            }else{ //新增
              register(data).then((response)=>{
              this.successHandler(response,form)
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleEdit(index,row){
        // console.log(row);
        this.dialogFormVisible=true;
        this.form.num=row.number;
        this.form.name=row.username;
        this.form.password=row.password;
        this.form.checkpass=row.password;
        this.form.role=row.role=='1'? '老师':'学生';
      },
      handleAdd(form){
        this.dialogFormVisible=true;
        this.$refs[form].resetFields();

      },
      successHandler(response,form){
        if(response.code==1){
          this.$emit('update');
        this.cancelHandler(form);
          this.$message({
            type: 'success',
            message: `操作成功`
          });
        }
      },
      cancelHandler(form){
        this.$refs[form].resetFields();
        this.dialogFormVisible=false;
      }
    }

  }
</script>
<style>
  .add-update{
    display:inline-block;
    margin-right:10px;
  }
  .add-update .el-dialog__header,.el-form-item__content{
    text-align: left;
  }
  .add-update .el-dialog__body{
    padding-left:10px;
  }
</style>
