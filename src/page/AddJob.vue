<template>
    <div class="background">
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="职业名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称">
                        <el-input v-model="form.company"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="form.linkman"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="区域">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="上城区" value="上城区"></el-option>
                            <el-option label="下城区" value="下城区"></el-option>
                            <el-option label="拱墅区" value="拱墅区"></el-option>
                            <el-option label="西湖区" value="西湖区"></el-option>
                            <el-option label="江干区" value="江干区"></el-option>
                            <el-option label="滨江区" value="滨江区"></el-option>
                            <el-option label="富阳区" value="富阳区"></el-option>
                            <el-option label="萧山区" value="萧山区"></el-option>
                            <el-option label="余杭区" value="余杭区"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-select v-model="form.biaoqian" multiple placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.joblabelname"
                            :label="item.joblabelname"
                            :value="item.joblabelname">
                            </el-option>
                        </el-select>
                        
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input v-model="form.detail"></el-input>
                    </el-form-item>
                    <el-form-item label="地图搜索">
                        <el-input v-model="addressKeyword" placeholder="请输入地址来直接查找相关位置"></el-input>
                        <baidu-map
                            class="bmView"
                            :scroll-wheel-zoom="true"
                            :center="location"
                            :zoom="zoom"
                            @click="getLocationPoint"
                            ak="YOUR_APP_KEY"
                        >
                        <bm-view style="width: 100%; height:400px; flex: 1"></bm-view>
                        <bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none"></bm-local-search>
                        </baidu-map>
                    </el-form-item>
                    <el-form-item label="横坐标">
                        <el-input v-model="form.lng"></el-input>
                    </el-form-item>
                    <el-form-item label="纵坐标">
                        <el-input v-model="form.lat"></el-input>
                    </el-form-item>
                    <el-form-item label="薪资">
                        <el-input v-model="form.salary"></el-input>
                    </el-form-item>
                    <el-form-item label="职位描述">
                        <el-input type="testarea" v-model="form.text"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">新建提交</el-button>
                        <el-button @click="back">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import{ labelList} from '../api/joblabel'
import { jobAdd} from '../api/job'
import axios from 'axios';
export default {
    name: 'baseform',
    data() {
        return {
            options:[],
            zoom:16,
            addressKeyword:'',
            location:{
                lng:'120.215264',
                lat:'30.26615'
            },
            length:'',
            temp:'',
            form: {
                phone:'',
                linkman:'',
                lng:'',
                lat:'',
                biaoqian:[],
                name: '',
                region: '',
                company: '',
                detail: '',
                salary:'',
                text:'',
            },
            ifFinish:false,
        };
    },
    created(){
        this.getJoblabelList();
    },
    methods: {
        iffnish(){
            if(this.form.phone&&this.form.linkman&&this.form.lng&&this.form.lat&&this.form.biaoqian&&this.form.name
            &&this.form.region&&this.form.company&&this.form.detail&&this.form.salary){
                let phone = this.form.phone;
                if(!(/^1[3456789]\d{9}$/.test(phone))){
                    this.$message.error('手机号有误');
                    return
                }
                else{
                    this.ifFinish=true
                }
            }else{
                this.$message.error("请填写完整信息")
            }
        },
        onSubmit() {
            this.length=this.form.biaoqian.length;
            for(var i=0;i<this.length;i++){
                this.temp=this.temp.concat(this.form.biaoqian[i]);
                if(i!=this.length-1){
                    this.temp=this.temp.concat(',')
                }
            }
            this.iffnish()
            if(this.ifFinish){
                let params={
                    label:this.temp,
                    name:this.form.name,
                    company:this.form.company,
                    detail:this.form.detail,
                    salary:this.form.salary,
                    linkman:this.form.linkman,
                    area:this.form.region,
                    lng:this.form.lng,
                    lat:this.form.lat,
                    phone:this.form.phone,
                    text:this.form.text
                }
                jobAdd(params).then(res=>{
                    if(res.status==200){
                        this.$message.success('添加成功！');
                        this.$router.go(-1)
                    }
                })
            }else{
            }
            
            this.temp='';
        },
        getLocationPoint(e) {
        this.location.lng = e.point.lng;
        this.location.lat = e.point.lat;
        this.form.lng=e.point.lng;
        this.form.lat=e.point.lat;
        },
        getJoblabelList(){
            let params={
                
            }
            labelList(params).then(res=>{
                if(res.status==200){
                    this.options=res.data.data;
                }
            })
        },
        back(){
            this.$router.go(-1);
        }
    }
};
</script>
<style>
.bmView{
    margin-top: 25px;
}
</style>