<template>
   <div class="bottom-menu">
      <check-button class="select-all" :is-checked='isChecked' @click.native.capture.stop='checkAll'></check-button>
      <span>全选</span>
      <span class="total-price">合计:{{totalPrice}}</span>
      <span class="buy-product" @click='calcClick'>去计算({{checkLength}})</span>
   </div>
</template>

<script>
   import CheckButton from 'components/content/checkbutton/CheckButton'

   export default {
      name: 'MarketBottomBar',
      components:{
         CheckButton
      },
      computed: {
         totalPrice() {
            return '¥'+this.$store.getters.selectedMarket.reduce((pre,next)=>{
               return pre+next.count*next.price
            },0).toFixed(2)
         },
         checkLength() {
            return this.$store.getters.selectedMarket.length
         },
         isChecked(){
            return this.$store.state.marketList.every(item=>item.isChecked)
         }
      },
      methods:{
         //全选
         checkAll(){
            // console.log(1111)
           this.$store.commit('checkAll',!this.isChecked)
         },
         calcClick(){
            this.$toast.show(`总计是${this.totalPrice}元`,2000)
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