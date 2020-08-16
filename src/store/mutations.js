export default {
   addToMarket(state,payload){
      const product = state.marketList.find(item=>item.iid===payload.iid)
      //如果找到 那就加1 如果没有找到 那就置1
      if(product){
         product.count++
      }else{
         state.marketList.push({
            ...payload,
            count:1,
            isChecked:true,
         })
      }
   },
   updateCheck(state,payload){
      const item = state.marketList.find(item=>item.iid===payload)
      item.isChecked = !item.isChecked
   },
   checkAll(state,payload){
      state.marketList.forEach(item=>{
         item.isChecked = payload
      })
   }
}