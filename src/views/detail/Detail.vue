<template>
    <div class="detail">
        <detail-nav-bar ref="navbar" @itemClick="itemClick" />

        <common-scroll @getPosition="getPosition" :probe-type="3" class='wrapper' ref="scroll">
            <common-swiper :padding-bottom='"80%"' :banner="banner" />
            <detail-good-info :good-info="goodInfo" />
            <detail-shop-info :shop="shopInfo" />
            <detail-image-info @imgLoad="imgLoad" :image-info="imageInfo" />
            <detail-params-info ref='params' :params-info="paramsInfo" />
            <detail-comment-info ref='comment' :comment-info="commentInfo" />
            <goods-list ref='goods' :goods="recommendInfo" />
        </common-scroll>
        <detail-bottom-bar @addMarket="addMarket" />
        <back-top @backTop="backTop" v-show="isShowBackTop" />
        <!--<toast ref="toast" />-->
    
    </div>
</template>

<script>
    
    import {mapGetters} from 'vuex'
    import {
        reqDetails,
        GoodsInfo,
        ShopInfo,
        GoodsParam,
        CommentInfo,
        reqRecommends
    } from 'api/detail'

    import { backTopMixin } from 'utils/mixins'


    import GoodsList from 'components/content/goodslist/GoodsList'
    // import Toast from 'components/content/toast/Toast'


    import DetailNavBar from './base/NavBar'
    import DetailGoodInfo from './base/GoodsInfo'
    import DetailShopInfo from './base/ShopInfo'
    import DetailImageInfo from './base/ImageInfo'
    import DetailParamsInfo from './base/ParamsInfo'
    import DetailCommentInfo from './base/CommentInfo'
    import DetailBottomBar from './base/BottomBar'

   
    export default {
        name: "Detail",
        data() {
            return {
                banner: [],
                goodInfo: {},
                shopInfo: {},
                imageInfo: {},
                paramsInfo: {},
                commentInfo: {},
                recommendInfo: [],
                offsetTopList: [],//内部的offsetTop 需要在前面几个组件渲染后获取
                // isShowBackTop:false,// 初始不显示返回顶部组件
                iid: '',
              
            }
        },
        components: {
            GoodsList,
            // Toast,
            DetailNavBar,
            DetailGoodInfo,
            DetailShopInfo,
            DetailImageInfo,
            DetailParamsInfo,
            DetailCommentInfo,
            DetailBottomBar
            // BackTop
        },
        mixins: [backTopMixin],
        created() {
            // console.log('detail created')
            this.getDetails()
            this.getRecommends()
        },
        computed:{
            ...mapGetters(['count'])
        },
        methods: {
            async getDetails() {
                this.iid = this.$route.params.iid
                const { result } = await reqDetails(this.iid)
                //轮播图数据  数组的们每一项是图片的src
                this.banner = result.itemInfo.topImages
                //商品信息
                this.goodInfo = new GoodsInfo(result.itemInfo, result.columns, result.shopInfo.services);
                //商铺信息
                this.shopInfo = new ShopInfo(result.shopInfo)

                //商品图片信息
                this.imageInfo = result.detailInfo;

                //参数信息
                this.paramsInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule);

                //评论信息
                if (result.rate.cRate !== 0) {
                    this.commentInfo = new CommentInfo(result.rate.list[0]);
                }
            },
            async getRecommends() {
                const result = await reqRecommends()
                // console.log(result)
                //获取推荐的图片数据
                this.recommendInfo = result.data.list
            },
            /*   offsetTopList = [0,6192,6995,7209]
            
                当滚动位置是
                  0<=x<=6192      商品按钮高亮   detail-nav-bar内部的currentIndex 0
                  6192<x<=6995    参数按钮高亮    1
                  6995<x<=7209    评论按钮高亮    2
                  >7209           推荐按钮高亮    3
             *
            *
            * */
            getPosition(position) {
                // console.log('detail组件的位置',position)
                const positionY = -position.y
                const [a, paramsOffsetTop, commentOffsetTop, goodsOffsetTop] = this.offsetTopList
                // // // console.log(a, paramsOffsetTop, commentOffsetTop, goodsOffsetTop)
                // if(positionY>a&&positionY<paramsOffsetTop){
                //     this.$refs.navbar.currentIndex = 0
                // }else if(positionY>=paramsOffsetTop&&positionY<commentOffsetTop){
                //     this.$refs.navbar.currentIndex = 1
                // }else if(positionY>=commentOffsetTop&&positionY<goodsOffsetTop){
                //     this.$refs.navbar.currentIndex = 2
                // }else if(positionY>=goodsOffsetTop&&positionY<100000){
                //     this.$refs.navbar.currentIndex = 3
                // }
                //
                for (let i in this.offsetTopList) {
                    if (i == this.offsetTopList.length - 1) break
                    let currentIndex = this.$refs.navbar.currentIndex
                    if (currentIndex != i && positionY >= this.offsetTopList[i] && positionY < this.offsetTopList[+i + 1]) {
                        this.$refs.navbar.currentIndex = +i
                    }
                }
                // for(let i of this.offsetTopList){
                //     if(i==this.offsetTopList.length-1)break
                //     let currentIndex = this.$refs.navbar.currentIndex
                //     if(currentIndex!=i&&positionY>=this.offsetTopList[i]&&positionY<this.offsetTopList[i+1]){
                //         console.log(i,typeof i)
                //         this.$refs.navbar.currentIndex = i
                //     }
                // }
                this.isShowBackTop = positionY >= 1000
            },
            itemClick(index) { //我们认为当图片已经加载好之后  用户才会点击按钮（商家 参数 评论 推荐）
                //如何获取 不同index对应的不同的滚动位置
                this.$refs.scroll.scrollTo(0, -this.offsetTopList[index], 200)
            },
            imgLoad(count) {
                this.offsetTopList.push(
                    0,
                    this.$refs.params.$el.offsetTop,
                    this.$refs.comment.$el.offsetTop,
                    this.$refs.goods.$el.offsetTop,
                    1000000
                )
                // console.log(`第${count}图片加载完成`, this.offsetTopList)
            },
            addMarket() {  //把商品数据添加到购物车里面
                //整合商品信息
                console.log('1111,addMarket')
                const product = {}
                product.image = this.banner[0];
                product.title = this.goodInfo.title;
                product.desc = this.goodInfo.desc;
                product.price = this.goodInfo.realPrice;
                product.iid = this.iid;
                // console.log(product)
                this.$store.commit('addMarket', product)
                // console.log(this.$store.getters.count)
                // this.$refs.toast.isShow = true
                // this.$refs.toast.message = `购物车中的数量为${this.count(this.iid)}`
                // setTimeout(()=>{
                //     this.$refs.toast.isShow = false
                //     this.$refs.toast.message = ''
                // },2000)
                // console.log(this.$refs.toast(`购物车中的数量为${this.count(this.iid)}`))
                // this.$refs.toast.show(`购物车中的数量为${this.count(this.iid)}`)
                this.$toast.show(`购物车中的数量为${this.count(this.iid)}`)
                // alert(this.$store.getters.count(this.iid))
            }
        }
    }
</script>

<style scoped lang="less">
    .wrapper {
        //设置better-scroll滚动区域的高度
        /*height:calc(100% - 44px);*/
        /*height: calc(~"100vh - 93px"); // less会导致编译的css不一样   可以百度less中使用calc 就会找到解决方法了*/
        position: fixed;
        top: 44px;
        bottom: 58px;
        left: 0;
        right: 0;
    }
</style>
