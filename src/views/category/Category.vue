<template>
    <div class='Category'>
        <common-nav-bar>
            <template #middle>分类</template>
        </common-nav-bar>
        
        <!--左侧滚动区域-->
        <common-scroll class="container1">
            <category-left-nav
                @itemClick="itemClick"
                :categorys="categorys"/>
        </common-scroll>
        <!--右侧滚动区域-->
        <common-scroll  class="container2">
            <category-grid-view :cols='4' :subcategory="subcategory"/>
            <tab-control
                @tabClick="tabClick"
                :titles='Object.values(types)'/>
            <goods-list :goods="goods[currentType].list"/>
        </common-scroll>
        
    </div>
</template>

<script>
    import {reqCategory,reqSubcategory,reqCategoryDetail} from 'api/category'
    
    import CategoryLeftNav from './base/LeftNav'
    import CategoryGridView from './base/GridView'
    
    import TabControl from 'components/content/tabcontrol/TabControl'
    import GoodsList from 'components/content/goodslist/GoodsList'
    export default {
        name: "Category",
        data(){
            return {
                categorys:[],   //存储左侧滚动区域的数据
                subcategory:[], //储存右侧subcategory(顶部)的数据
                currentIndex:0,
                currentType:'pop',
                // typeList:['pop','new','sell'],  //定义商品类型的数据
                types:{
                    pop:'综合',
                    new:"新款",
                    sell:'销量'
                },
                goods:{
                    pop:{
                        list:[],
                    },
                    new:{
                        list:[],
                    },
                    sell:{
                        list:[],
                    }
                }
            }
        },
        created(){
            this.getCategory()
        },
        components:{
            CategoryLeftNav,
            CategoryGridView,
            TabControl,
            GoodsList
        },
        methods:{
            itemClick(index){
                if(index===this.currentIndex)return
                console.log('执行')
                this.currentIndex = index
                //获取右侧上两部分的数据
                this.getSubcategory()
                //请求右侧下面的数据  用于渲染GoodsList  基于指定商品的miniWallkey
                // this.getSubCategoryDetail('pop')  //请求pop类型的数据
                // this.getSubCategoryDetail('sell')  //请求pop类型的数据
                // this.getSubCategoryDetail('new')  //请求pop类型的数据
                // Object.keys(this.types).forEach(type=> this.getSubCategoryDetail(type))
                Object.keys(this.types).forEach(this.getSubCategoryDetail)
            },
            tabClick(index){
                // console.log(index)
                this.currentType = this.typeList[index]
            },
            async getCategory(){
                const result = await reqCategory()
                // console.log(result)
                //左侧滚动区域的数据
                this.categorys = result.data.category.list
                //请求右侧上面的数据 用于渲染CategoryGridView 基于指定商品的maitKey
                this.getSubcategory()
                //请求右侧下面的数据  用于渲染GoodsList  基于指定商品的miniWallkey
                // this.getSubCategoryDetail('pop')  //请求pop类型的数据
                // this.getSubCategoryDetail('sell')  //请求pop类型的数据
                // this.getSubCategoryDetail('new')  //请求pop类型的数据
                // Object.keys(this.types).forEach(type=> this.getSubCategoryDetail(type))
                Object.keys(this.types).forEach(this.getSubCategoryDetail)
            },
            async getSubcategory(){
                const {maitKey} = this.categorys[this.currentIndex]
                const result = await reqSubcategory(maitKey)
                this.subcategory = result.data.list
            },
            async getSubCategoryDetail(type){
                const {miniWallkey} = this.categorys[this.currentIndex]
                const result = await reqCategoryDetail(miniWallkey, type)
                // console.log(result)
                this.goods[type].list = result
            }
         
        }
    }
</script>

<style scoped>
    
    .nav-bar{
        background-color: pink;
        font-weight: bold;
        color:#fff
    }

    .container1 {
        position: fixed;
        top: 44px;
        bottom: 49px;
        width: 100px;
    }

    .container2 {
        position: fixed;
        top: 44px;
        bottom: 49px;
        right: 0;
        left: 100px;
    }

</style>
