import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        
        
        {
            path: '/home',
            component: () => import( '../components/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import( '../page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/test2',
                    component: () => import( '../page/Test2.vue'),
                    meta: { title: '测试2' }
                },
                {
                    path: '/jobinformation',
                    component: () => import( '../page/Jobinformation.vue'),
                    meta: { title: '兼职信息' }
                },
                {
                    path: '/tuijiantable',
                    component: () => import( '../page/tuijiantable.vue'),
                    meta: { title: '推荐' }
                },
                {
                    path: '/addjob',
                    component: () => import( '../page/AddJob.vue'),
                    meta: { title: '添加职位' }
                },
                {
                    path: '/addlabel',
                    component: () => import( '../page/AddLabel.vue'),
                    meta: { title: '添加标签' }
                },
                {
                    path: '/adduser',
                    component: () => import( '../page/AddUser.vue'),
                    meta: { title: '添加用户' }
                },
                {
                    path: '/editlabel',
                    component: () => import( '../page/EditJoblabel.vue'),
                    meta: { title: '修改标签' }
                },
                {
                    path: '/edituser',
                    component: () => import( '../page/EditUser.vue'),
                    meta: { title: '修改用户' }
                },
                {
                    path: '/editjob',
                    component: () => import( '../page/EditJob.vue'),
                    meta: { title: '修改职业信息' }
                },
                {
                    path: '/usertable',
                    component: () => import( '../page/UserTable.vue'),
                    meta: { title: '账号管理' }
                },
                {
                    path: '/jobtable',
                    component: () => import( '../page/JobTable.vue'),
                    meta: { title: '兼职信息管理' }
                },
                {
                    path: '/labeltable',
                    component: () => import( '../page/LabelTable.vue'),
                    meta: { title: '标签管理' }
                },
                
                {
                    path: '/icon',
                    component: () => import('../page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                
                {
                    path: '/form',
                    component: () => import('../page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import( '../page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import( '../page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
            ]
        },
        {
            path: '/login',
            component: () => import('../page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
