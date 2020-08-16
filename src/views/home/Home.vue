<template>
    <div class="home">
        <common-nav-bar>
            <template #middle>购物街</template>
        </common-nav-bar>
    
        <tab-control
                class="tab-control"
                ref="tabControl1"
                @tabClick="tabClick"
                v-show="isShowTabControl"
                :titles='Object.values(types)'/>
        <common-scroll
            @loadMore="loadMore"
            @getPosition="getPosition"
            ref="scroll"
            :pull-up-load="true"
        >
            <common-swiper :padding-bottom='"52%"' :banner="banner"/>
            <home-recommend :recommend="recommend"/>
            <home-popular/>
            <tab-control
                    ref="tabControl2"
                    @tabClick="tabClick"
                    :titles='Object.values(types)'/>
            <goods-list :goods="goods[currentType].list"/>
        </common-scroll>
        
        <!--<back-top @click.native="backTop" ></back-top>-->
        <back-top @backTop="backTop" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    
    import {reqHomeMultidata,reqHomeGoods} from  'api/home'
    import {backTopMixin} from 'utils/mixins'
    import TabControl from 'components/content/tabcontrol/TabControl'
    import GoodsList from 'components/content/goodslist/GoodsList'
    // import BackTop from 'components/content/backtop/BackTop'
    
    import HomeRecommend from './base/Recommend'
    import HomePopular from './base/Popular'

    export default {
        name: 'Home',
        data() {
            return {
                banner:[],//轮播图数据
                recommend:[],   //推荐数据
                currentType:'pop',  //记录tab切换的类型
                isShowTabControl:false, //初始不显示第一个TabControl组件
                // isShowBackTop:false,// 初始不显示返回顶部组件
                types:{
                    pop:'流行',
                    new:"新款",
                    sell:'精选'
                },
                goods:{ //商品数据
                    pop:{
                        list:[],    //流行选项  对应的数据
                        page:0,     //记录请求了第几页的流行数据
                    },
                    new:{      //新款的数据
                        list:[],
                        page:0
                    },
                    sell:{      //精选的数据
                        list:[],
                        page:0
                    }
                }
            }
        },
        mixins:[backTopMixin],
        created(){
            console.log('home created')
            this.getHomeMultidata()
            // Object.keys(this.types).forEach(type=>this.getHomeGoods(type))
            Object.keys(this.types).forEach(this.getHomeGoods)
            //监听imgLoad事件
        },
        mounted() {
            //减少this.$refs.scroll.refresh函数执行的频率
            //函数防抖:限制指定函数的执行频率  一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效
            const debounce = function (fn,time) {
                let timer = null
                return function () {
                    clearTimeout(timer)
                    timer = setTimeout(fn,time)
                }
            }
            
            const fresh = debounce(this.$refs.scroll.refresh,500)
            
            // this.$bus.$on('imgLoad',this.$refs.scroll.refresh)
            this.$bus.$on('imgLoad',fresh)
        },
    
        components:{
            TabControl,
            GoodsList,
            // BackTop,
            HomeRecommend,
            HomePopular
        },
        methods:{
            async getHomeMultidata(){
                const result = await reqHomeMultidata()
                // console.log(result)
                //轮播图 数据
                const data = result.data
                //数组的每一项是个对象  对象的image属性是图片的src
                this.banner = data.banner.list.map(item=>item.image)
                this.recommend = data.recommend.list
            },
            async getHomeGoods(type){
                // console.log(type)
                const page = ++this.goods[type].page
                const result = await reqHomeGoods(type,page)
                // console.log(result)
                this.goods[type].list.push(...result.data.list)
            },
            tabClick(index){
                this.$refs.tabControl1.currentIndex = this.$refs.tabControl2.currentIndex = index
                this.currentType = Object.keys(this.types)[index]
            },
            loadMore(){ //加载对应类型的数据
                this.getHomeGoods(this.currentType)
                //使用子组件的方法 执行该方法是让better scroll 知道数据已经加载完成了
                this.$refs.scroll.finishPullUp()
            },
            getPosition(position){
                // console.log('home组件的位置',position)
                const positionY = -position.y
                const isShowTabControl = positionY>=this.$refs.tabControl2.$el.offsetTop
                this.isShowTabControl =  isShowTabControl
                this.isShowBackTop = positionY>=1000
            },
        }
    }
</script>



<style scoped lang="less">
     .nav-bar{
         background-color: pink;
         font-weight: bold;
         color:#fff
     }
     .wrapper{  //设置better-scroll滚动区域的高度
        /*height:calc(100% - 44px);*/
         /*height: calc(~"100vh - 93px"); // less会导致编译的css不一样   可以百度less中使用calc 就会找到解决方法了*/
         position: fixed;
         top:44px;
         bottom:49px;
         left:0;
         right:0;
     }
    
    .tab-control{
        position: relative;
        z-index: 1;
        background-color: #fff;
    }
    
    
</style>
