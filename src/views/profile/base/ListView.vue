<template>
  <div id="list">
    <ul v-for="(item, index) in listData" :key="index" class="item">
      <li class="info">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    props: {
      listData: {
        type: Array,
        default: function () {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }
  
  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }
  
  .item .info {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
    text-indent: 20px;
  }
  
  .item:last-of-type .info {
    border-bottom: none;
  }
</style>
