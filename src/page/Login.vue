<template>
    <div class="homepage-hero-module">
        <div class="video-container">   
            <div :style="fixStyle" class="filter">
                <div class="ms-login">
                    <div class="ms-title">登录</div>
                        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                            <el-form-item prop="username">
                                <el-input v-model="param.username" placeholder="username">
                                    <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    type="password"
                                    placeholder="password"
                                    v-model="param.password"
                                    @keyup.enter.native="submitForm()"
                                >
                                    <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                </el-input>
                            </el-form-item>
                            <div class="login-btn">
                                <el-button type="primary" @click="submitForm()">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
                <video :style="fixStyle" autoplay loop muted class="fillWidth" >
                    <source src="../assets/view/beijing.mp4" type="video/mp4"/>
                </video>
        </div>
    </div>
</template>

<script>
import {login} from '../api/login'
import axios from 'axios';
export default {
    data: function() {
        return {
            vedioCanPlay:false,
            fixStyle:'',
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    created:{
        

    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    let params={
                        userId:this.param.username,
                        passWord:this.param.password
                    }
                    login(params).then(res=>{
                        if(res.status==200){
                            console.log(res.data)
                        this.$message.success('登录成功');
                        localStorage.setItem('ms_username', res.data.data[0].name);
                        localStorage.setItem('user_id',res.data.data[0].id);
                        this.$router.push('/dashboard');
                        }
                    }).catch(res=>{
                        this.$message.error('密码错误');
                    })
                } 
                else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                    }
            });
        },
    },
}
</script>

<style scoped>
 .homepage-hero-module,
 .video-container {
 position: relative;
 height: 100vh;
 overflow: hidden;
 }
  
 .video-container .poster img{
 z-index: 0;
 position: absolute;
 }
  
 .video-container .filter {
 z-index: 1;
 position: absolute;
 background: rgba(0, 0, 0, 0.4);
 width: 100%;
 }
  
 .fillWidth {

 }
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: 250px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>