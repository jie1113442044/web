<template>
<div class="background">
    <div class="table">
        <div class="box-t" flex="dir:left main:justify" style="marginBottom:10px" >
            <div>职位信息列表</div> 
            <div class="box-t-r" flex="dir:left">
                    <div class="input"><el-input v-model="model.name" clearable @change="clear" placeholder="请输入职位名称搜索"></el-input> </div>
                    <div class="button" ><el-button @click="info">查询</el-button></div>
                    <div class="button" @click="addjob"> <el-button >新增</el-button></div>
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
                prop="jobId"
                label="id"
                align="center"
                header-align="center"
                >
                </el-table-column>
                <el-table-column
                prop="jobName"
                align="left"
                header-align="left"
                label="职位名称"
                >
                </el-table-column>
                <el-table-column
                prop="company"
                label="公司名称"
                align="left"
                header-align="left"
                >
                </el-table-column>
                <el-table-column
                prop="area"
                label="区域"
                align="left"
                header-align="left"
                >
                </el-table-column>
                <el-table-column
                prop="areaDetail"
                header-align="center"
                label="详细地址"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="salary"
                header-align="center"
                align="center"
                label="薪资（日薪）"
                >
                </el-table-column>
                <el-table-column align="left" header-align="center" label="操作" prop>
                    <slot flex="cross:center" slot-scope="scope">
                        <el-button
                            class="detail" 
                            type="text"
                            @click="Editlabel(scope.row.jobId)">编辑
                        </el-button>
                        <el-button
                            class="edit"
                            type="text"
                            @click="Delete(scope.row.jobId)"
                        >删除</el-button>
                    </slot>
                </el-table-column>
            </el-table>
        </div>
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
</template>
<script>
import { jobSelect,jobDelete} from '../api/job' 
import axios from 'axios';
export default {
    data(){
        return{
            text:'',
            tableData:[],
            id:'',
            current:1,
            model:{
                page:1,
                pageSize:5,
                name:''
            }
        }
    },
    created(){
        this.info();
    },
    methods:{
        clear(){
            this.info();
        },
        handleSizeChange(val) {
        this.model.pageSize=val
        this.info();
        },
        handleCurrentChange(val) {
            this.model.page=val;
            this.info();
        },
        info(){
            let params =  this.model
            jobSelect(params).then(res=>{
                if(res.status==200){
                    this.tableData=res.data.data
                }
            })
        },
        addjob(){
            this.$router.push('/addjob');
        },
        Delete(labeliId){
            let params={
                    id:labeliId

            }
            jobDelete(params).then(res=>{
                if(res.status==200){
                    this.$message.success('删除成功！');
                    this.info();
                }
            })
        },
        Editlabel(ID){
            this.$router.push({path:"/editjob",query:{id:ID}})
        }
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