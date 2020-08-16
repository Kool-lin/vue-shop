<template>
  <ul class='home-recommend'>
    <li v-for='item in recommend' class='recommend-item'>
      <img :src="item.image" alt="" >
      <p>{{item.title}}</p>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Recommend",
        props:{
            recommend:{
                type:Array,
                default(){
                    return []
                }
            }
        },
    }
</script>

<style lang="less" scoped>
  .home-recommend{
    display: flex;
    font-size: 12px;
    /*padding: 15px 0 30px;*/
    border-bottom: 8px solid #eee;
    text-align:center;
    height: 0;
    padding-top: 5%;
    padding-bottom: 35%;
    .recommend-item{
      flex:1;
      img{
        width: 80%;
      }
      p{
        padding-top:10px;
      }
    }
  }
</style>
