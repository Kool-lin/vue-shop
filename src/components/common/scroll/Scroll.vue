<template>
   <div ref='wrapper'>
      <div>
         <slot></slot>
      </div>
   </div>
</template>

<script>
   import BScroll from 'better-scroll'
   export default {
      name: 'my-scroll',
      props: {
         probeType: {
            type: Number,
            default: 0,
         },
         pullUpLoad: {
            type: Boolean,
            default: false
         }
      },
      data() {
         return {
            scroll: null
         }
      },
      methods: {
         finishPullUp(){
            //当上拉数据完成后  告知scroll数据已经加载完
            this.scroll.finishPullUp()
         },
         refresh(){
            //重新计算scroll滚动的区域
            this.scroll.refresh()
            // console.log('refresh',this.scroll.scrollerHeight)
         },
         scrollTo(x,y,time=500){
            this.scroll.scrollTo(x,y,time)
         }
      },
      mounted() {
         this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            // 0 1  滚动 顶部
            probeType: this.probeType,    //是否监听滚动  0 1都不监听  2监听滚动 不监听回弹  3监听滚动和回弹
            pullUpLoad: this.pullUpLoad   // 监听是否滚动到底部
         })

         //监听用户的滚动
         this.scroll.on('scroll', position => {
            // console.log(position)
            this.$emit('scroll', position)
         })

         console.log('lala',this.scroll.scrollerHeight)

         //下拉加载更多
         this.scroll.on('pullingUp', () => {
            // console.log('加载更多')
            this.$emit('pullingUp')
         })
      }
   }

</script>
<style></style>