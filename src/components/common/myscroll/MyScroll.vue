<template>
  <div class='wrapper' ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>

    import BScroll from 'better-scroll'
    export default {
        name: "CommonScroll", //名字是课后修改的
        props:{
            pullUpLoad:{
                type:Boolean,
                default:false,//默认不监控滚动到最底部
            },
            probeType:{
                type:Number,
                default: 0
            }
        },
        data: () => ({
            scroll:null
        }),
        mounted(){  //在这里初始化  better-scroll  不在created里面初始化
            // new BScroll('.wrapper')
             this.scroll = new BScroll(this.$refs.wrapper,{
                 click:true,//允许在滚动区域点击
                 pullUpLoad:this.pullUpLoad,//  允许监听pullingUp 事件
                 probeType:this.probeType //允许监听滚动
            })
            
            //监听 滚动到滚动区域的最底部  默认只能监听滚动到最底部一次
            this.scroll.on('pullingUp',()=>{
                // console.log('滚到了滚动区域的最底部')
                this.$emit('loadMore')
            })

          // console.log(this.scroll)  //初始化时得到的可滚动内容 没有计算图片的高度 因为此时图片还没有加载
          // debugger

          // 只要滚动就会触发该事件
            this.scroll.on('scroll',(position)=>{
                // console.log(position)
                this.$emit('getPosition',position)
            })

        },
        methods:{
            finishPullUp(){
                this.scroll.finishPullUp()
            },
            scrollTo(x,y,time=500){
                this.scroll.scrollTo(x,y,time)
            },
            refresh(){  //重新计算可滚动内容的高度
              console.log('refresh',this.scroll.scrollerHeight)
              this.scroll.refresh()
            }
        }
    }
</script>

<style scoped>

</style>
