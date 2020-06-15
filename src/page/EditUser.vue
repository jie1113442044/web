<template>
    <div class="background">
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="id">
                        <el-input disabled v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="账号">
                        <el-input v-model="form.userid"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input  type="password" v-model="form.password"></el-input>
                    </el-form-item>
                        <el-button type="primary" @click="onSubmit">新建提交</el-button>
                        <el-button @click="back">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import {updateUser,listUser} from '../api/user'
import axios from "axios"
export default {
    data(){
        return{
            id:'',
            tableData:[],
            form:{
                name:'',
                id:'',
                userid:'',
                password:''
            }
        }
    },
    created(){
        
        this.getlabel();
        
    },
    methods:{
        onSubmit(){
            let params={
                id: this.form.id,
                name:this.form.name,
                userid:this.form.userid,
                password:this.form.password
            }
            updateUser(params).then(res=>{
                if(res.status==200){
                    this.$message.success("编辑成功")
                    this.$router.go(-1);
                }
            })
        },
        getlabel(){
            let params={
                id:this.$route.query.id
            }
            listUser(params).then(res=>{
                if(res.status==200){
                    this.form.name=res.data.data[0].name;
                    this.form.id=res.data.data[0].id;
                    this.form.userid=res.data.data[0].userid;
                    this.form.password=res.data.data[0].password;
                }
            })
        },
        back(){
            this.$router.go(-1);
        }
    }
}
</script>
<style>
.bmView{
    margin-top: 25px;
}
</style>