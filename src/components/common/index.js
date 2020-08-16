import Vue from 'vue'
const requireContext = require.context('./',true,/\.vue$/)
requireContext.keys().forEach(fileName=>{
    const componentConfig = requireContext(fileName)
    // console.log(componentConfig.default.name,componentConfig);
    Vue.component(
        componentConfig.default.name,
        componentConfig.default
    )
})
