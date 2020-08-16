<template>
  <div id="profile">
    <nav-bar class="profile-nav" >
      <template #middle>
        超级商场
      </template>
    </nav-bar>
    
    <user-info></user-info>
    <shop-account/>
    <list-view :list-data="orderList" class="order-list"/>
    <list-view :list-data="serviceList" class="service-list"/>
    <list-view :list-data="moreList" class="more-list"/>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import UserInfo from './base/UserInfo';
  import ListView from './base/ListView';
  import ShopAccount from './base/ShopAccount';

  export default {
    name: 'Profile',
    data() {
      return {
        orderList: [
          '我的消息',
          '积分商城',
          '会员卡'
        ],
        serviceList: [
          '我的购物车',
          '下载购物APP',
        ],
        moreList:[
          '设置',
          '更多',
        ]
      }
    },
    components:{
      NavBar,
      UserInfo,
      ListView,
      ShopAccount
    }
  }
</script>

<style scoped lang="less">
  @import '~assets/css/varible.less';
  
  #profile{
    height: 100vh;
    position: relative;
    background-color: #f2f2f2;
  }
  .profile-nav{
    background-color: @themeColor;
    color: #fff;
  }
  
  .order-list, .service-list {
    margin-top: 12px ;
    
  }
  .order-list, .more-list {
    margin-top: 12px;
  }

</style>
