import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        products:JSON.parse(localStorage.getItem('products'))||[]//存储所有的商品
    },
    mutations:{ //定义修改store数据的方法
        addMarket(state,payload){
            //先从products数组中查找有没有这次添加的商品  如果没有则添加count 1 如果找到则count++
            const product = state.products.find(item=>item.iid===payload.iid)
            // console.log(product)
            if(product){    //如果找到了
                product.count ++
            }else{      //如果没有找到了
                state.products.push({
                    ...payload,
                    count:1,
                    checked:true//按钮默认选中
                })
                // state.products.push(Object.assign({count:1},payload))
            }
        },
        updateCheck(state,payload){ //更新check按钮的状态
            const product = state.products.find(item=>item.iid===payload)
            product.checked = !product.checked

        },
        //根据全选按钮的状态  来改变所有商品的状态
        selectAll(state,payload){
            state.products.forEach(item=>item.checked = payload)
        },

    },
    actions:{

    },
    getters:{
        count(state){   //获取添加的某类商品的数量
            return function (iid) {
                const product = state.products.find(item=>item.iid===iid)
                return product.count
            }
        },
        //所有商品种类的数量
        productsLength(state){
            return state.products.length
        },
        isCheckAll(state){   //全选按钮是否选中
            // console.log(state,state.products.every(item=>item.checked))
            return state.products.every(item=>item.checked)
        },
        //选中商品的种类数量
        selectedProductsLength(state){
            return state.products.filter(item=>item.checked).length
        },
        //计算所有选中商品的 价格总和
        total(state){
            return state.products.reduce((pre,next)=>{
                return pre+(next.checked?next.count*next.price:0);
            },0)
        }
    }
})

//监听mutations 里面方法的执行  因为一旦方法执行了  state数据一定就改变了
store.subscribe(function (mutations,state) {
    // console.log(arguments)
    //存储数据到本地
    localStorage.setItem('products',JSON.stringify(state.products))
})

export default store
