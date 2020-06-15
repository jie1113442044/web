<template>
<div>
    <div  class="box">
        <ul id="list" class="">
            <li :id="flag==1?'redBright':'red'"></li>
            <li :id="flag==2?'greenBright':'green'"></li>
            <li :id="flag==3?'yellowBright':'yellow'"></li>
        </ul>
    </div>
    <div class="asd">
            <el-scrollbar style="height:110%">
                <p>刚好项目里面一直在使用的都是element</p>
                <p>因为原生的滚动条太丑了</p>
                <p>发现elementui中有个隐藏的组件</p>
                <p>优化滚动条样式</p>
                <p>亲测可用</p>
                <p>刚好项目里面一直在使用的都是element</p>
                <p>因为原生的滚动条太丑了</p>
                <p>发现elementui中有个隐藏的组件</p>
                <p>优化滚动条样式</p>
                <p>亲测可用</p>
            </el-scrollbar>
    </div> 
</div>
</template>
<script>
export default {
    data(){
        return{
            arr:[1,2,5,6],
            flag:1,
            a:{
                id:1,
                name:'a'
            },
            b:{

            },
            abc:'abc'
        }
    },
    created(){
        this.start()
    },
    methods:{
        
        fun(){
            setTimeout(()=>{
                if(this.flag==1){
                    this.flag=2
                }
                setTimeout(()=>{
                if(this.flag==2){
                    this.flag=3
                }
                setTimeout(()=>{
                if(this.flag==3){
                    this.flag=1
                }
                this.fun()
            },2000)
            },2000)
            },2000)
        },
        start(){
            this.arr.forEach(element => {
                console.log(element)
            });
            this.fun(
            )
            // while(this.flag!=0){
            //     this.fun();
            // }
        },
    }

}
</script>
<style scoped>
.el-scrollbar__wrap{
  overflow: scroll;
}
    ul{}
    li{list-style: none;width: 80px;height: 80px;border-radius: 50%;float: left;margin:20px;opacity: .1;}
    #red{background: red;}
    #green{background: green;}
    #yellow{background: yellow;}
    #redBright{
        transition: 0.5s ease-in  ;
        background-color: red;
        opacity:1;
    }
    #greenBright{ 
        transition: 0.5s ease-in  ;
        opacity:1;
        background: green;
        }
    #yellowBright{ 
        transition: 0.5s ease-in  ;
        opacity:1;
        background: yellow;
        }
.box{
 width: 500px;
 height: 500px;
}

.asd{
    width: 200px;
    height: 100px;
    background: aliceblue;
}
.box1{
    background-color: blue;
    width: 100px;
    height: 100px;
    margin-bottom: 110px;
    /* position:  relative; */
    
 }
 .box2{
    background-color: yellow;
    width: 100px;
    height: 100px;
    margin-top: 50px;

 }
</style>
