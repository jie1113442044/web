<template>
    <div class="background">
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="标签名称">
                        <el-input v-model="form.name"></el-input>
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
import {labelAdd } from '../api/joblabel.js'
import axios from 'axios'
export default {
    data(){
        return{
            form:{
                name:'',
            }
        }
    },
    methods:{
        onSubmit(){
            if(this.form.name){
                let params={
                    labelname:this.form.name
                }
                labelAdd(params).then(res=>{
                if(res.status==200){
                    this.$message.success('添加成功');
                    this.$router.go(-1);
                }
                })
            }
            else{
                this.$message.error('请填写要增加的标签名称');
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