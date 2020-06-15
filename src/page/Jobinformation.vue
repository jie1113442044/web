<template>
<div class="main-box">
    <div class="midbox" flex="dir:top">
        <div class="query" flex="main:center">
            <div class="input1">
            <el-input placeholder="请输入想要搜索的职位名称" v-model="model.name">
                <el-button @click="info" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            </div>
            <div class="select1">
            <el-select 
            @change="info"
            clearable
            @clear="info"
            placeholder="选择区域" v-model="model.area" >
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
            </div>
            <div class="select2">
                <el-select 
                v-model="model.label"
                placeholder="请选择"
                clearable
                @change="info"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.joblabelname"
                        :label="item.joblabelname"
                        :value="item.joblabelname">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="screen">
            <el-card class="box-card" flex="dir:top">
                <div class="screenItem">
                日薪范围:
                <el-radio-group v-model="radioSolary"
                @change="getSolary(radioSolary)"
                >
                <el-radio-button label="不限"></el-radio-button>
                <el-radio-button label="50-100"></el-radio-button>
                <el-radio-button label="100-150"></el-radio-button>
                <el-radio-button label="150-200"></el-radio-button>
                <el-radio-button label="200以上"></el-radio-button>
                </el-radio-group>
                </div>
            </el-card>
            <!-- 已选条件 -->
            <el-card class="yxtj">
                <div flex="main:justify">
                    <div  flex="dir:left">  
                        已选条件：
                        <div style="fontSize:14px">日薪范围:  <span class="radioItem">{{radioSolary}}</span>
                        </div>
                    </div>
                    <div>共找到 <span style="color:#4CBCFF">{{tableData.length}}</span> 个职位</div>
                </div>
                <div class="xsfs" flex="dir:left">显示方式:
                    <div @click="changeBox"><i :class="`el-icon-lx-sort`" :style="changeState==false?'color:#4CBCFF':''"></i> </div>
                    <div @click="changeBox"><i :class="`el-icon-lx-apps`" :style="changeState==true?'color:#4CBCFF':''"></i> </div>
                </div>
            </el-card>
        </div>
        <div class="table-box" v-if="!changeState"> 
            <el-table
                :data="tableData"
                @row-click="handle"
                style="width: 100%">
                <el-table-column
                    prop="jobName"
                    label="职位名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="company"
                    label="公司"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="area"
                    label="区域"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="areaDetail"
                    label="详细地址"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="salary"
                    label="工资"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="linkman"
                    label="联系人"
                    >
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="联系电话"
                    >
                </el-table-column>
            </el-table>
            <div id="fy" flex="main:center cross:center">
                <el-pagination
                    background
                    :page-size="5"
                    layout="sizes,prev, pager, next"
                    :current-page="current"
                    :page-sizes="[4, 8, 16]"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="100">
                </el-pagination>
            </div>
        </div>
        <div class="box-table2" v-else flex="dir:left">
            <div class="table-left">
                <div  flex="dir:top" :key="index" v-for="(item,index) in tableData" >
                    <div class="table-item" @click="selectOne(item.jobId)">
                        <!-- <div class="biaoji" ><i class="el-icon-lx-attentionfill"></i></div> -->
                        <div>{{item.jobName}} <i v-if="biaoji==item.jobId" class="el-icon-lx-attentionfill" style="color:rgb(43, 142, 185)" ></i> </div>
                        <div style="fontSize:14px;margin:5px 0 0 10px">{{item.company}}</div>
                        <div style="fontSize:14px;margin:5px 0 0 10px">{{item.area}}</div>
                        <div style="fontSize:14px;margin:5px 0 0 10px">薪资：{{item.salary}}/天</div>
                        <div  class="biaoqian" flex="dir:left">
                            <div :key="index" v-for="(item,index) in item.label" > <el-button class="biaoq">{{item}}</el-button> </div>
                        </div>
                    </div>
                </div>
                <div class="fenye">
                <el-pagination
                    background
                    :page-size="4"
                    layout="prev, pager, next"
                    :current-page="current"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="100">
                </el-pagination>
                </div>
            </div>
            <div class="table-right" :class="state?'after-b':''" flex="dir:top">
                <div class="right-first" flex="dir:left">
                    <div>
                        <div style="color:#2b8eb9;fontSize:22px">{{tableDataa.jobName}}</div>
                        <div style="fontSize:14px;margin:20px 0 0 15px">{{tableDataa.company}}</div>
                        <div style="fontSize:14px;margin:10px 0 0 15px">{{tableDataa.area}}</div>
                        <div style="fontSize:14px;margin:10px 0 0 15px">联系人：{{tableDataa.linkman}}</div>
                    </div>
                    <div> 
                        <div style="color:#f37c1b;fontSize:25px;margin:70px 0 0px 50px">薪资：{{tableDataa.salary}}/天</div>
                        <div style="fontSize:14px;margin:5px 0 0 50px"> 联系电话：{{tableDataa.phone}}</div>
                    </div>
                </div>
                <div class="right-second">
                    <div>
                        详细地址：<i class="el-icon-lx-location"></i>  <span> {{tableDataa.areaDetail}}</span>
                    </div>
                </div>
                <div class="right-third">
                    <div class="map">
                        <baidu-map class="bm-view" :center="{lng: tableDataa.mapLng, lat: tableDataa.mapLat}" :zoom="17":scroll-wheel-zoom="true">
                            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
                            <bm-marker  :position="{lng: tableDataa.mapLng, lat: tableDataa.mapLat}"
                                :dragging="false" 
                                :title="tableDataa.company"  
                                @click="infoWindowOpen"
                                >
                                <!-- animation="BMAP_ANIMATION_BOUNCE" -->
                                <bm-info-window class="tishi" :show="show" @close="infoWindowClose" @open="infoWindowOpen">{{tableDataa.company}}</bm-info-window>
                            </bm-marker>
                            <!-- <bm-transit start="浙江大学城市学院" :end="tableDataa.areaDetail"  location="杭州"></bm-transit> -->
                        </baidu-map>
                    </div>
                    <!-- <div><el-button @click="chaxun">查询</el-button></div> -->
                </div>
            </div>
            <div  class="table-right-ring" :class="state?'after-a':''">
                <div class="zwms">
                    职位描述
                </div>
                <div class="zwmsText">
                    工作要求：<br>
                    {{tableDataa.text}}
                    <div></div>
                </div>
                <div class="tjxx">
                    相似推荐
                </div>
                <div class="zwmsText">
                    <el-card v-if="tuijianData[0]" class="tuijian">
                        <div flex="dir:left"  >
                            <div>
                                <div><span>职位：</span> <span>{{tuijianData[0].jobName}}</span> </div>
                                <div><span>公司: </span> <span>{{tuijianData[0].company}}</span> </div>
                                <div><span>地区: </span> <span>{{tuijianData[0].area}}</span> </div>
                            </div>
                            <div style="width:50px">
                                <span class="iconfont iconkehuguanli" ></span>
                            </div>
                        </div>
                    </el-card>
                    <el-card  v-if="tuijianData[1]" class="tuijian">
                        <div flex="dir:left"  >
                            <div>
                                <div><span>职位：</span> <span>{{tuijianData[1].jobName}}</span> </div>
                                <div><span>公司: </span> <span>{{tuijianData[1].company}}</span> </div>
                                <div><span>地区: </span> <span>{{tuijianData[1].area}}</span> </div>
                            </div>
                            <div style="width:50px">
                                <span class="iconfont iconkehuguanli" ></span>
                            </div>
                        </div>
                    </el-card>
                    <div v-if="tuijianData[2]" @click="gotoTj(tableDataa)" style="cursor:pointer">查看更多</div>
                </div>
            </div>
    </div>
    </div>
            

</div> 
</template>
<script>
import { labelList } from '../api/joblabel'
import{ jobSelect,jobList,jobTuijian} from '../api/job'
import axios from 'axios'
export default {
    data(){
        return{
            show:true,
            current:1,
            model:{
                name:'',
                area:'',
                label:'',
                minNum:'',
                maxNum:'',
                page:1,
                pageSize:4
            },
            tableDataa:[],
            splitTemp:[],
            changeState:true,
            jobNum:'1',
            password:'',
            tableData:[],
            username1:'',
            radioSolary:'不限',
            radioTime:'不限',
            radioJob:'不限',
            activeIndex:'1',
            input1:'',
            params:[],
            fullscreen: false,
            name: 'linxin',
            message: 2,
            state:false,
            options:[],
            biaoji:'',
            tuijianData:[],
        }
    },
    created(){
        this.info();
        this.getJoblabelList();
    },
    methods: {
        infoWindowClose () {
            this.show = false
        },
        infoWindowOpen () {
            this.show = true
        },
        // chaxun(){
        //     var start = "百度大厦";
        //     var end = "北京邮电大学西门";
        //     var routePolicy = BMAP_TRANSIT_POLICY_LEAST_TIME;
        //     var transit = new BMap.TransitRoute(map, {
        //         renderOptions: {map: map},
        //         policy: 0
        //     }); 
        //     function search(start,end,routePolicy){
        //         transit.setPolicy(routePolicy);
        //         transit.search(start,end);
        //     }
        // },
        gotoTj(val){
                this.$router.push({path:"/tuijiantable",query:{id:val.jobId,label:val.joblabel[0]}})
        },
        getJoblabelList(){
            labelList().then(res=>{
                if(res.status==200){
                    this.options=res.data.data;
                }
            })
        },
        getAll(){
            this.getjobList();
        },
        info(){
            let params=this.model
            jobSelect(params).then(res=>{
                if(res.status==200){
                    this.tableData=res.data.data;
                    for(var i=0;i<res.data.data.length;i++){
                        this.splitTemp=res.data.data[i].joblabel.split(",");
                        this.tableData[i].label=this.splitTemp;
                        this.splitTemp='';
                    }
                    this.state=false
                }
            })
        },
        selectOne(ID){
            this.biaoji=ID;
            this.state=true;
            let params={
                    id:ID
                }
            jobList(params).then(res=>{
                if(res.status==200){
                    this.tableDataa=res.data.data[0]
                    this.splitTemp=res.data.data[0].joblabel.split(",");
                    this.tableDataa.joblabel=this.splitTemp;
                    this.splitTemp='';
                    let textTemp = this.tableDataa.text;
                    
                    let params={
                        page:1,
                        pageSize:999,
                        id:this.tableDataa.jobId,
                        label:this.tableDataa.joblabel[0]
                    }
                    jobTuijian(params).then(res=>{
                        if(res.status==200){
                            this.tuijianData=res.data.data
                        }
                    })
                    if(this.tableDataa.joblabel[1]){
                        let params={
                        page:1,
                        pageSize:999,
                        id:this.tableDataa.jobId,
                        label:this.tableDataa.joblabel[1]
                        }
                        jobTuijian(params).then(res=>{
                            if(res.status==200){
                                let temp =this.tuijianData.concat(res.data.data)
                                this.tuijianData=temp
                                let Data = this.tuijianData
                                let jsondata = JSON.stringify(Data)
                                localStorage.setItem("tuijian",jsondata)
                            }
                        })
                    }
                }
            })
        },
        handleSizeChange(val) {
        this.model.pageSize=val
            this.info();
        },
        handleCurrentChange(val) {
            this.model.page=val;
            this.info();

        },
        changeBox(){
            if(this.model.pageSize!=4){
                this.model.pageSize=4
                this.info()
            }
            this.changeState=!this.changeState;
            console.log(this.changeState);
        },  
        handle(row) {
           
        },
        getTime(){
            console.log(this.radioTime);
        },
        getSolary(mes){
            if(mes=="不限"){
                this.model.minNum='',
                this.model.maxNum=''
            }
            else if(mes=="50-100"){
                this.model.minNum=50,
                this.model.maxNum=100
            }
            else if(mes == "100-150"){
                this.model.minNum=100,
                this.model.maxNum=150
            }
            else if(mes == "150-200"){
                this.model.minNum=150,
                this.model.maxNum=200
            }
            else if(mes == "200以上"){
                this.model.minNum=200,
                this.model.maxNum=999999
            }
            this.info();
        },
        getJob(){
            console.log(this.radioJob);
        },
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }
        },
        getRegion(val) {
            this.regions = val;
        }, 
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
        
    },
}
</script>

<style scoped >

.tishi{
    width: 50px;
    height: 15px;
}
.el-table__header tr,
.el-table__header th {
height: 100px;
}
.iconfont{
    margin-left:50px;
    font-size:50px;
    position: static;
    right:  50px;
    color:#2b8eb8;
}
.tuijian{
    height:120px;
    margin-bottom:5px;
}
.fenye{
    position:absolute;
    bottom: 0;
}
#fy{
    position:absolute;
    bottom: 0;
    left: 40%;
}
.tjxx{
    width: 80px;
    height: 25px;
    background-color: #2b8eb8;
    color:#fff;
    padding: 15px;
    margin-top: 10px;
    border-top-right-radius: 15%;
    border-bottom-right-radius: 50%;
}
.zwmsText{
margin-top: 20px;
margin-left: 15px;
margin-bottom: 50px;
}
.zwms{
    width: 80px;
    height: 25px;
    background-color: #2b8eb8;
    color:#fff;
    padding: 15px;
    margin-top: 10px;
    border-top-right-radius: 15%;
    border-bottom-right-radius: 50%;
}
.table-right-ring{
    background-color: #fff;
    width: 750px;
    margin-left:50px ;
    transition: all .8s ease-in-out;
    overflow: hidden;
    opacity: 0;
    display:inline-block;
}

.map{
    width: 100%;
    height: 100%;

}
.bm-view{
    width: 100%;
    height: 100%;
}
.table-right{
    box-shadow:8px 8px 8px 8px rgba(175,175,175,0.39);
    margin-top: 3px;
    margin-left: 50px;
    width:600px;
    transition: all .8s ease-in-out;
    opacity: 0;
    padding:5px 5px 5px 5px;
    background-color: #fff;
    overflow: hidden;


}
.right-third{
    margin-top: 10px;
    width: 100%;
    height: 100%;
}
.right-second{
    background-color:#e1f2fa;
    margin-top: 10px;
    padding:5px
}
.right-first{
    background-color: #e1f2fa;
    padding:10px 10px 10px 10px
}
.table-left{
    width: 350px;
    padding:3px
}
.after-a{
    opacity: 1;
}
.after-b{
    opacity: 1;
}
.biaoqian{
    margin-left: 5px;
    padding:3px 0 3px 0;
}
.biaoqian{
    margin-right: 5px;
}
.table-item{
    background-color: #fff;
    box-shadow:8px 8px 8px 8px rgba(175,175,175,0.39);
    padding:10px;
    height: 120px;;
}
.el-icon-lx-sort{
    margin-left: 10px;
    font-size: 18px;
}
.el-icon-lx-apps{
    margin-left: 30px;
    font-size: 18px;
}
.xsfs{
    margin-top: 18px;
    font-size: 12px;
}
.screenItem{
    padding-bottom:10px ;
}
.radioItem{
    color:#4CBCFF;
    font-size:16px;
    margin-right: 10px;
}
.table-box{
    margin-top: 10px;
}
.box-table2{
    margin-top: 10px;
    height: 570px;
}
.screen{
    margin-top: 10px;
}
.yxtj{
margin-top: 10px;
}
.input1 {
    margin-left: 30px;
    width: 600px;
}
.select1{
    margin-left: 30px;
    width: 200px;
}
.select2{
    margin-left: 30px;
    width: 300px;
}
 
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    margin-left: 50px;
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>