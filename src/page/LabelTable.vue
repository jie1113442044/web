<template>
<div class="background">
    <div class="table">
        <div class="box-t" flex="dir:left main:justify"  style="marginBottom:10px">
            <div>标签信息列表</div> 
            <div class="box-t-r" flex="dir:left">
                    <div class="input"><el-input v-model="model.name" clearable @clear="info" placeholder="请输入"></el-input> </div>
                    <div class="button" ><el-button @click="info" >查询</el-button></div>
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
                prop="joblabelid"
                label="id"
                align="center"
                header-align="center"
                >
                </el-table-column>
                <el-table-column
                prop="joblabelname"
                align="center"
                header-align="center"
                label="标签名称"
                >
                </el-table-column>
                <el-table-column align="center" header-align="center" label="操作" prop>
                    <slot flex="cross:center" slot-scope="scope">
                        <el-button
                            class="detail" 
                            type="text"
                            @click="Editlabel(scope.row.joblabelid)">编辑
                        </el-button>
                        <el-button
                            class="edit"
                            type="text"
                            @click="Delete(scope.row.joblabelid)"
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
import{ labelSelect,labelDelete} from '../api/joblabel'
import axios from 'axios';
export default {
    data(){
        return{
            text:'',
            tableData:[],
            model:{
                page:1,
                pageSize:5,
                name,
            },
            current:1
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
        info(){
            let params = this.model
            labelSelect(params).then(res=>{
                if(res.status==200){
                    this.tableData=res.data.data;
                }
            })
        },
        addjob(){
            this.$router.push('/addlabel');
        },
        Delete(labeliId){
            let params={
                id:labeliId
            }
            labelDelete(params).then(res=>{
                if(res.status==200){
                    this.$message.success('删除成功！');
                    this.info();
                }
            })
        },
        Editlabel(ID){
            this.$router.push({path:"/editlabel",query:{id:ID}})
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
    height: 750px;
}

.button{
    margin-left:30px;
}
.fenye{
    position: absolute;
    bottom: 50px;

}
</style>