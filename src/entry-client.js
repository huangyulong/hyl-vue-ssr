// 只需创建应用程序，并将其挂载到DOM中
import { createApp } from './app'
import Vue from 'vue'

// 客户端特定引用逻辑
const { app } = createApp()

// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。
// 而在客户端，在挂载到应用程序之前，store 就应该获取到状态
if(window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// 客户端数据预处理:
// 有两种方式： 先预处理数据再匹配路由渲染组件；  先匹配路由再预处理数据
// 下面是第二种， 两个的差别就是页面加载的速度问题
// 但是如果路由重用时都要重新调用asyncData函数
Vue.mixin({
    beforeMount() {
        const { asyncData } = this.$options
        if(asyncData) {
            // 将获取的数据操作分配给promise
            // 以便在组件中，我们可以在数据准备就绪后
            // 通过运行this.dataPromise.then(...) 来执行其他任务
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    },
    beforeRouteUpdate(to, from, next){
        const {asyncData} = this.$options
        if(asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

// 假定App.vue模板中根元素具有‘id=“app”’ $mount是手动挂载功能
// 
app.$mount('#app', true)