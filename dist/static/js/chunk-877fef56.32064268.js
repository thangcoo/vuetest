(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-877fef56"],{"11e9":function(e,t,r){var n=r("52a7"),a=r("4630"),o=r("6821"),s=r("6a99"),i=r("69a8"),l=r("c69a"),c=Object.getOwnPropertyDescriptor;t.f=r("9e1e")?c:function(e,t){if(e=o(e),t=s(t,!0),l)try{return c(e,t)}catch(r){}if(i(e,t))return a(!n.f.call(e,t),e[t])}},"5dbc":function(e,t,r){var n=r("d3f4"),a=r("8b97").set;e.exports=function(e,t,r){var o,s=t.constructor;return s!==r&&"function"==typeof s&&(o=s.prototype)!==r.prototype&&n(o)&&a&&a(e,o),e}},"8b97":function(e,t,r){var n=r("d3f4"),a=r("cb7c"),o=function(e,t){if(a(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,n){try{n=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),n(e,[]),t=!(e instanceof Array)}catch(a){t=!0}return function(e,r){return o(e,r),t?e.__proto__=r:n(e,r),e}}({},!1):void 0),check:o}},9093:function(e,t,r){var n=r("ce10"),a=r("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,a)}},a2d6:function(e,t,r){"use strict";var n=r("e96c"),a=r.n(n);a.a},aa77:function(e,t,r){var n=r("5ca1"),a=r("be13"),o=r("79e5"),s=r("fdef"),i="["+s+"]",l="​",c=RegExp("^"+i+i+"*"),u=RegExp(i+i+"*$"),f=function(e,t,r){var a={},i=o(function(){return!!s[e]()||l[e]()!=l}),c=a[e]=i?t(d):s[e];r&&(a[r]=c),n(n.P+n.F*i,"String",a)},d=f.trim=function(e,t){return e=String(a(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(u,"")),e};e.exports=f},ad8f:function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"d",function(){return o}),r.d(t,"c",function(){return s}),r.d(t,"a",function(){return i});var n=r("b775");function a(e){return Object(n["a"])({url:"/user/inquire",method:"post",data:e})}function o(e){return Object(n["a"])({url:"/user/update",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/user/reg",method:"post",data:e})}function i(e){return Object(n["a"])({url:"/user/del",method:"post",data:e})}},c5d4:function(e,t,r){},c5f6:function(e,t,r){"use strict";var n=r("7726"),a=r("69a8"),o=r("2d95"),s=r("5dbc"),i=r("6a99"),l=r("79e5"),c=r("9093").f,u=r("11e9").f,f=r("86cc").f,d=r("aa77").trim,p="Number",m=n[p],b=m,h=m.prototype,g=o(r("2aeb")(h))==p,v="trim"in String.prototype,_=function(e){var t=i(e,!1);if("string"==typeof t&&t.length>2){t=v?t.trim():d(t,3);var r,n,a,o=t.charCodeAt(0);if(43===o||45===o){if(r=t.charCodeAt(2),88===r||120===r)return NaN}else if(48===o){switch(t.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+t}for(var s,l=t.slice(2),c=0,u=l.length;c<u;c++)if(s=l.charCodeAt(c),s<48||s>a)return NaN;return parseInt(l,n)}}return+t};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof m&&(g?l(function(){h.valueOf.call(r)}):o(r)!=p)?s(new b(_(t)),r,m):_(t)};for(var y,w=r("9e1e")?c(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;w.length>k;k++)a(b,y=w[k])&&!a(m,y)&&f(m,y,u(b,y));m.prototype=h,h.constructor=m,r("2aba")(n,p,m)}},cec7:function(e,t,r){"use strict";var n=r("c5d4"),a=r.n(n);a.a},e382:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tableWrap"},[r("add-update",{attrs:{types:"add"},on:{update:e.updata}}),e._v(" "),r("el-table",{staticClass:"userLists",staticStyle:{width:"100%"},attrs:{data:e.userLists,border:""}},[r("el-table-column",{attrs:{prop:"number",label:"代号",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"username",label:"用户名",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"password",label:"密码",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{prop:"role",label:"角色",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[r("el-tag",{attrs:{size:"medium",type:e._f("filterType")(t.row.role)}},[e._v(e._s(e._f("filterRole")(t.row.role)))])],1)]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"备注",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("add-update",{attrs:{types:"update",row:t.row,index:t.$index},on:{update:e.updata}}),e._v(" "),r("el-button",{attrs:{type:"text",disabled:"admin"==t.row.username,size:"mini"},on:{click:function(r){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("el-pagination",{attrs:{"current-page":e.current,"page-sizes":[10,20,50,100],"page-size":e.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:pageSize":function(t){e.size=t},"update:page-size":function(t){e.size=t}}})],1)},a=[],o=r("ad8f"),s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"add-update"},["add"==e.types?r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleAdd()}}},[e._v("新增")]):r("el-button",{attrs:{type:"text",size:"mini",disabled:"admin"==e.row.username},on:{click:function(t){return e.handleEdit(e.index,e.row)}}},[e._v("修改")]),e._v(" "),r("el-dialog",{attrs:{title:"add"==e.types?"新增":"修改",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"代号",prop:"num"}},[r("el-input",{attrs:{autocomplete:"off",placeholder:"代号"},model:{value:e.form.num,callback:function(t){e.$set(e.form,"num",t)},expression:"form.num"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用户名",prop:"name"}},[r("el-input",{attrs:{autocomplete:"off",placeholder:"登录账号"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"password",required:"add"==e.types}},[r("el-input",{attrs:{type:"password",autocomplete:"off",placeholder:"密码"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"确认密码",prop:"checkpass",required:"add"==e.types}},[r("el-input",{attrs:{type:"password",autocomplete:"off",placeholder:"确认密码"},model:{value:e.form.checkpass,callback:function(t){e.$set(e.form,"checkpass",t)},expression:"form.checkpass"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"角色",prop:"role"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}},[r("el-option",{attrs:{label:"老师",value:"1"}}),e._v(" "),r("el-option",{attrs:{label:"学生",value:"2"}})],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){return e.cancelHandler("form")}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitHandler("form",e.row)}}},[e._v("确 定")])],1)],1)],1)},i=[],l=(r("7f7f"),r("c5f6"),r("61f7")),c={props:{types:{type:String,required:!0},row:{type:Object,default:function(){return{}}},index:{type:Number,default:0}},name:"add-update",data:function(){var e=this,t=function(t,r,n){""===r?n(new Error("确认密码不能为空")):r!==e.form.password?n(new Error("两次输入密码不一致!")):n()};return{dialogFormVisible:!1,form:{num:"",name:"",password:"",checkpass:"",role:""},rules:{num:[{required:!0,message:"代号不能为空",trigger:"blur"}],name:[{required:!0,message:"用户名不能为空",trigger:"blur"}],password:[{trigger:"blur",validator:l["b"]}],checkpass:[{trigger:"blur",validator:t}],role:[{required:!0,message:"角色不能为空",trigger:"change"}]}}},methods:{submitHandler:function(e,t){var r=this;this.$refs[e].validate(function(n){if(!n)return console.log("error submit!!"),!1;var a={username:r.form.name,password:r.form.password,role:r.form.role,number:r.form.num};"update"==r.types?(a.userId=t._id,Object(o["d"])(a).then(function(t){r.successHandler(t,e)})):Object(o["c"])(a).then(function(t){r.successHandler(t,e)})})},handleEdit:function(e,t){this.dialogFormVisible=!0,this.form.num=t.number,this.form.name=t.username,this.form.password=t.password,this.form.checkpass=t.password,this.form.role="1"==t.role?"老师":"学生"},handleAdd:function(e){this.dialogFormVisible=!0,this.$refs[e].resetFields()},successHandler:function(e,t){1==e.code&&(this.$emit("update"),this.cancelHandler(t),this.$message({type:"success",message:"操作成功"}))},cancelHandler:function(e){this.$refs[e].resetFields(),this.dialogFormVisible=!1}}},u=c,f=(r("a2d6"),r("2877")),d=Object(f["a"])(u,s,i,!1,null,null,null),p=d.exports,m={name:"user",data:function(){return{size:10,current:1,userLists:[],total:0,dialogFormVisible:!1}},components:{addUpdate:p},created:function(){this.getList()},filters:{filterRole:function(e){return"0"==e?"管理员":"1"==e?"老师":"学生"},filterType:function(e){return"0"==e?"danger":"1"==e?"warning":""}},methods:{getList:function(){var e=this;Object(o["b"])({pageNum:this.current,pageSize:this.size}).then(function(t){console.log(t.data.userLists),e.userLists=t.data.userLists,e.total=t.data.totalPage})},handleDelete:function(e,t){var r=this;this.$confirm("确定对id=".concat(t._id,"进行删除操作?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o["a"])({userId:t._id}).then(function(e){r.$message({type:"success",message:e.data}),r.getList()})})},updata:function(){this.getList()},handleSizeChange:function(e){this.size=e,this.getList()},handleCurrentChange:function(e){console.log(e),this.current=e,this.getList()}}},b=m,h=(r("cec7"),Object(f["a"])(b,n,a,!1,null,null,null));t["default"]=h.exports},e96c:function(e,t,r){},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);