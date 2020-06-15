<template>
    <div>
        <!-- <div id="areaChart"></div> -->
        <div flex="dir:left">
            <!-- <div id="labelChart"></div> -->
            <div>
                <!-- <canvas width="300" height="300" id="myCanvas"></canvas> -->
                <svg :width='width' :height='height' @mousemove='listener($event)'>
                    <a :href="tag.href" v-for='tag in tags'>
                        <text :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
                    </a>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import {labelchart,areaChart}from '../api/job'
import{labelList} from '../api/joblabel'
import axios from'axios';
export default {
    name: 'dashboard',
    data() {
        return {
            options:[],
            list:["1"],
            width:500,//svg宽度
            height:500,//svg高度
            // tagsNum:10,//标签数量
            RADIUS:150,//球的半径
            speedX:Math.PI/360,//球一帧绕x轴旋转的角度
            speedY:Math.PI/360,//球-帧绕y轴旋转的角度
            tags: [],
            areaList:[],
            areaNumList:[],
            labelList:[],
        }
    },
    computed:{
        CX(){//球心x坐标
            return this.width/2;
        },
        CY(){//球心y坐标
            return this.height/2;
        }
    },
    components: {
    },
    created(){//初始化标签位置
        this.getJoblabelList();
        this.getarea();

    },
    mounted()
    {//使球开始旋转
        setInterval(() => {
            this.rotateX(this.speedX);
            this.rotateY(this.speedY);
        }, 17)
    },
    methods:{
        getJoblabelList(){
            labelList().then(res=>{
                if(res.status==200){
                    this.options=res.data.data;
                    // options.forEach(el=>{
                    //     this.options.push(el.joblabelname)
                    // })
                    let tags=[];
                    for(let i = 0; i < this.options.length; i++){
                        let tag = {};
                        let k = -1 + (2 * (i + 1) - 1) / this.options.length;
                        let a = Math.acos(k);
                        let b = a * Math.sqrt(this.options.length * Math.PI)//计算标签相对于球心的角度
                        if(this.options[i]){
                            tag.text = this.options[i].joblabelname;
                        }
                        tag.x = this.CX +  this.RADIUS * Math.sin(a) * Math.cos(b);//根据标签角度求出标签的x,y,z坐标
                        tag.y = this.CY +  this.RADIUS * Math.sin(a) * Math.sin(b); 
                        tag.z = this.RADIUS * Math.cos(a);
                        tags.push(tag);
                        console.log(tag)
                    }
                    this.tags = tags;
                }
            })
        },
        rotateX(angleX){
            var cos = Math.cos(angleX);
            var sin = Math.sin(angleX);
            for(let tag of this.tags){
                var y1 = (tag.y- this.CY) * cos - tag.z * sin  + this.CY;
                var z1 = tag.z * cos + (tag.y- this.CY) * sin;
                tag.y = y1;
                tag.z = z1;
            } 
        },
        rotateY(angleY){
            var cos = Math.cos(angleY);
            var sin = Math.sin(angleY);
            for(let tag of this.tags){
                var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
                var z1 = tag.z * cos + (tag.x-this.CX) * sin;
                tag.x = x1;
                tag.z = z1;
            } 
        },
        listener(event){//响应鼠标移动
            // var x = event.clientX - this.CX;
            // var y = event.clientY - this.CY;
            // this.speedX = x*0.0001>0 ? Math.min(this.RADIUS*0.00002, x*0.0001) : Math.max(-this.RADIUS*0.00002, x*0.0001);
            // this.speedY = y*0.0001>0 ? Math.min(this.RADIUS*0.00002, y*0.0001) : Math.max(-this.RADIUS*0.00002, y*0.0001); 
        },
        getlabel(){
            labelchart().then(res=>{
                if(res.status==200){
                    this.labelList = res.data.data;
                    this.drawLine();
                }
            })
        },
        getarea(){
            areachart().then(res=>{
                if(res.status==200){
                    let list= res.data.data;
                    for(var i = 0;i<list.length;i++){
                        this.areaList.push(list[i].area)
                        this.areaNumList.push(list[i].showNum)
                    }
                    this.getlabel()
                }
            })
        },
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let areaChart = this.$echarts.init(document.getElementById('areaChart'))
            let labelChart = this.$echarts.init(document.getElementById('labelChart'))
            // 绘制图表
            areaChart.setOption({
                title: { text: '各个区域的职位统计' },
                color: ['#6EA8FF'],
                tooltip: {},
                xAxis: {
                    data:this.areaList
                },
                yAxis: {},
                series: [{
                    name: '数量',
                    type: 'bar',
                    data: this.areaNumList
                }]
            });
            labelChart.setOption({
                title: { text: '根据标签的职位统计' },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',    // 设置图表类型为饼图
                        radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                        data:this.labelList,
                        label: {
                            normal: {
                                // position: 'inner',//隐藏引导线
                                // show: false//隐藏标识文字
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#FF6565', '#7B6CFF', '#FF6CB8', '#D56CFF', '#291AFF', '#A009E8', '#FF037D', '#D1E8BA', '#FF880D', '#FF250D',
                                        '#A83C43', '#6CD7FF', '#E809D2', '#FFC00D', '#FFC00D', '#FF037D', '#FF570D', '#A8706B', '#C909E8', '#7F1AFF'
                                    ];
                                    return colorList[params.dataIndex];
                                },
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
                
            });
        }
    }
};
</script>


<style scoped>
#areaChart{
    width: 100%;
    height: 300px;
}
#labelChart{
    margin-left: 100px;
    width: 500px;
    height: 500px;
}
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
