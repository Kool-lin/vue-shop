<template>
  <ul class="tab-control">
    <li v-for='item,index in titles' @click="handleClick(index)" :class="{active:currentIndex===index}">
      <span>{{item}}</span>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                currentIndex:0
            }
        },
        methods:{
            handleClick(index){  //记录点击的索引
                // console.log(index)
                this.currentIndex = index
                // 告诉父组件 点击了哪个li 子组件把数据传给父组件
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style lang="less" scoped>
  @import '~assets/css/varible.less';
  
  /*.fixed{*/
    /*position: fixed;*/
    /*top:0;*/
    /*left: 0;*/
    /*right:0;*/
    /*z-index:22*/
  /*}*/
  .tab-control {
    /*z-index: 1;*/
    /*position: relative;*/
    display: flex;
    text-align: center;
    line-height: 40px;
    /*background-color: #fff;*/
    li {
      flex: 1
    }
    .active {
      span {
        padding: 5px;
        color:@hightTextColor;
        border-bottom: 3px solid @hightTextColor
      }
    }
  }
</style>
