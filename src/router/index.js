import Vue       from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')
const Market = () => import('views/market/Market.vue')
const Detail = () => import('views/detail/Detail.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {index: 0}
    },
    {
        path: '/category',
        component: Category,
        meta: {index: 1}
    },
    {
        path: '/market',
        component: Market,
        meta: {index: 2,requireAuth:true}
        // 通过添加requireAuth:true来表示market组件需要进行权限验证
        //  验证规则是 如果购物车中有数据 那就可以访问market组件 即通过验证
        //  如果购物车中没有数据 那就不可以访问market组件 即没通过验证
    },
    {
        path: '/profile',
        component: Profile,
        meta: {index: 3}
    },
    {
        path: '/detail/:iid',
        component: Detail,
        meta: {index: 4}    //控制detail组件的方向
    }
]


const router = new VueRouter({
    mode: 'history',
    routes
})

//监听路由的跳转  只要监听到路由跳转了 就会触发回调函数
router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){   //如果需要验证  就进行验证
        if(localStorage.getItem('products')){   //如果获取到了数据
            next()
        }else{//没有通过验证 直接跳转到 home
            next('/home')
        }
    }else{//如果不需要验证 就直接next
        next()
    }
})


export default router
