<template>
  <div class="market">
    <common-nav-bar>
      <template #middle>购物车({{$store.getters.productsLength}})</template>
    </common-nav-bar>
    <common-scroll
            @getPosition="getPosition"
            :probe-type="3"
            ref="scroll"
    >
      <market-list/>
    </common-scroll>
    <market-bottom-bar/>
    <back-top @backTop="backTop" v-show="isShowBackTop" :bottom="'100px'"/>
  </div>
</template>

<script>

    import {backTopMixin} from 'utils/mixins'
  
    import MarketList     from './base/MarketList'
    import MarketBottomBar from './base/BottomBar'
    export default {
        name: 'Market',

        data() {
            return {
            
            }
        },
        mixins:[backTopMixin],
        components: {
            MarketList,
            MarketBottomBar
        },
        methods:{
            getPosition(position){
                // console.log('market组件的位置',position)
                const positionY = -position.y
                this.isShowBackTop = positionY>=100
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
  
  
  .wrapper{
    position: fixed;
    top:44px;
    bottom:93px;
    left:0;
    right:0;
  }

</style>
