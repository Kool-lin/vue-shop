<template>
   <div class="icon-selector" :class="{'selector-active': isChecked}" @click='checkClick'>
      <img src="~/assets/img/cart/tick.svg" alt="">
   </div>
</template>

<script>
   export default {
      name: "CheckButton",
      props: {
         isChecked: {
            type: Boolean,
            default: false,
         },
         iid:{
            type:String
         }
      },
      methods:{
         checkClick(){
            //改变仓库中数据
            this.$store.commit('updateCheck',this.iid)
         }
      }
     
   }
</script>

<style scoped>
   .icon-selector {
     position: relative;
     margin: 0;
     width: 18px;
     height: 18px;
     border-radius: 50%;
     border: 2px solid #ccc;
     cursor: pointer;
   }
 
   .selector-active {
     background-color: #59c3e5;
     border-color: #59c3e5;
   }
 </style>