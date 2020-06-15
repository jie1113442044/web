<template>
<div class="background">
    <div class="table" >
        <div class="box-t" flex="dir:left main:justify"  style="marginBottom:10px">
            <div>账号信息列表</div> 
            <div class="box-t-r" flex="dir:left">
                    <div class="input"><el-input clearable @clear="clear"  v-model="model.name" placeholder="请输入用户名称搜索"></el-input> </div>
                    <div class="button" ><el-button @click="info" >查询</el-button></div>
                    <div class="button" @click="adduser"> <el-button >新增</el-button></div>
            </div>
        </div>
        <div class="box-middle">
            <el-table
                :data="tableData"
                style="width: 100%"
                align="center"
                max-height="550">
                <el-table-column
                fixed
                prop="id"
                label="id"
                align="center"
                header-align="center"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                align="left"
                header-align="left"
                label="用户名称"
                >
                </el-table-column>
                <el-table-column
                prop="userid"
                label="账号"
                align="left"
                header-align="left"
                >
                </el-table-column>
                <el-table-column align="left" header-align="center" label="操作" prop>
                    <slot flex="cross:center" slot-scope="scope">
                        <el-button
                            class="detail" 
                            type="text"
                            @click="edit(scope.row.id)">编辑
                        </el-button>
                        <el-button
                            class="edit"
                            type="text"
                            @click="Delete(scope.row.id)"
                        >删除</el-button>
                    </slot>
                </el-table-column>
            </el-table>
        </div>
        <div class="fenye">
                <el-pagination
                    background
                    :page-size="5"
                    layout="sizes,prev, pager, next"
                    :current-page="current"
                    @size-change="handleSizeChange"
                    :page-sizes="[5, 10, 15]"
                    @current-change="handleCurrentChange"
                    :total="100">
                </el-pagination>
        </div>
    </div>
    
</div>
</template>
<script>
import { getUser,deleteUser } from '../api/user'
import axios from 'axios';
export default {
    data(){
        return{
            text:'',
            tableData:[],
            current:1,
            model:{
                page:1,
                pageSize:5,
                name:''
            }
        }
    },
    created(){
        this.info()
    },
    methods:{
        handleSizeChange(val) {
        this.model.pageSize=val
        this.info();
        },
        handleCurrentChange(val) {
            this.model.page=val;
            this.info();

        },
        clear(){
            this.info();
        },
        info(){
            let params = this.model
            getUser(params).then(res=>{
                if(res.status==200){
                    console.log(res)
                    this.tableData=res.data.data;
                }
            })
            // axios.get("api/user/select",{
            //     params
            // }).then(res=>{
            //     console.log(res)
            //     if(res.status==200){
            //         this.tableData=res.data.data;
            //     }
            // })
        },
        adduser(){
            this.$router.push('/adduser');
        },
        edit(ID){
            this.$router.push({path:"/edituser",query:{id:ID}})
        },
        Delete(labeliId){
            let params={
                id:labeliId
            }
            deleteUser(params).then(res=>{
                if(res){
                    this.$message.success('删除成功！');
                    this.info();
                }
            })
        },
    },

    
}
</script>
<style>
.background{
    background-color: #eee;
}
.table{
    background-color: #fff;
    padding:30px;
    height:750px;
}
.button{
    margin-left:30px;
}
.fenye{
    position: absolute;
    bottom: 50px;

}
</style>