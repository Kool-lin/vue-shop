export default {
   marketLength(state,getters){
      return state.marketList.length
   },
   selectedMarket(state,getters){
      return state.marketList.filter(item=>item.isChecked)
   },
   //获取数据
   count(state,getters){
      return function(iid){
         return state.marketList.find(item=>item.iid===iid).count
      }
   }
}