<template>
   <div v-if='Object.keys(subCategorys).length!==0'>
      <div class="grid-view" ref="gridView">
         <div class="content-item" v-for="(item, index) in subCategorys">
            <img :src="item.image" alt="" />
            <p>{{item.title}}</p>
         </div>
      </div>
   </div>

</template>

<script>
   export default {
      name: 'GridView',
      props: {
         subCategorys: {
            type: Array,
            default() {
               return []
            }
         },
         cols: {
            type: Number,
            default: 3
         },
         
         // hMargin: {
         //    type: Number,
         //    default: 8
         // },
         // vMargin: {
         //    type: Number,
         //    default: 8
         // },
         itemSpace: {
            type: Number,
            default: 8
         },
         // lineSpace: {
         //    type: Number,
         //    default: 8
         // }
      },
      mounted() {
         // setTimeout(this.layOut,20)
         // console.log('mounted',this.subCategorys)

      },
      updated() {
         // console.log('updated',this.subCategorys)
         // const gridView = this.$refs.gridView

         // const children = gridView.children
         // console.log(gridView, gridView.children)

         if(this.subCategorys.length!==0){   //如果有值 那就布局
         //   setTimeout(this.layOut,20)
           this.layOut()
         }
         
      },
      methods: {
         layOut() {
            const gridView = this.$refs.gridView
            const items = gridView.children

            const itemWidth = (gridView.clientWidth - this.itemSpace)/this.cols 
            console.log(itemWidth)
            items.forEach(item=>{
               item.style.width = itemWidth +'px'
            })
         }
      }
   }
</script>
<style lang="less" scoped>
   .grid-view {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
   }

   .content-item {
      text-align: center;
      font-size: 12px;
   }

   .content-item img {
      width: 80%;
   }

   .content-item p {
      margin-top: 15px;
      line-height: 20px;
      font-size: 14px
   }
</style>