<template>
  <div class="bottom-menu">
    <check-button class="select-all" @click.native="btnClick" :checked="isCheckAll"/>
    <span>全选</span>
    <span class="total-price">合计:¥{{this.total.toFixed(2)}}</span>
    <span class="buy-product" @click="calc">去计算({{this.selectedProductsLength}})</span>
    <!--<toast />-->
    <!--<toast ref="toast" />-->

  </div>
</template>

<script>
  
  import CheckButton from './CheckButton'
  // import Toast from 'components/content/toast/Toast'

  
  import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: 'MarketBottomBar',
        components:{
            CheckButton,
            // Toast
        },
        computed:{
            ...mapGetters(['isCheckAll','selectedProductsLength','total'])
        },
        methods:{
            ...mapMutations(['selectAll']),
            btnClick(){  //如果全选按钮选中了  那所有的按钮都应该选中
                console.log('selectAll',this.isCheckAll)
                this.selectAll(!this.isCheckAll)
                
            },
            calc(){
                // console.log(this.$toast)
                this.$toast.show(`商品总和为${this.total.toFixed(2)}`)
            }
        }
    }
</script>

<style lang='less' scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    right:0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  
  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  
  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  
  .bottom-menu .buy-product {
    background-color: #59c3e5;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
