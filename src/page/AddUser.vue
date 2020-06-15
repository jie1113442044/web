<template>
    <div class="background">
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="form.userid"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
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
import {userAdd} from '../api/user'
import axios from "axios"
export default {
    data(){
        return{
            form:{
                name:'',
                userid:'',
                password:''
            }
        }
    },
    methods:{
        onSubmit(){
            if(this.form.name){
                let params={
                    name:this.form.name,
                    userid:this.form.userid,
                    password:this.form.password
                }
                userAdd(params).then(res=>{
                if(res.status==200){
                    this.$message.success('添加成功');
                    this.$router.go(-1);
                }
                else{
                    this.$message.error('系统繁忙');
                }
                })
                // axios.get("api/user/add",{
                // params:{
                //     name:this.form.name,
                //     userid:this.form.userid,
                //     password:this.form.password
                // }
                // }).then(res=>{
                // if(res.status==200){
                //     this.$message.success('添加成功');
                //     this.$router.go(-1);
                // }
                // else{
                //     this.$message.error('系统繁忙');
                // }
                // })
            }
            else{
                this.$message.error('请填写完整信息');
            }
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