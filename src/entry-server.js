// 使用export default导出函数，并在每次渲染中重复调用此函数
// 除了创建和返回应用实例之外不会做太多事情
// 但是路由和数据预取逻辑需要在这实现

import { createApp } from './app'

export default context => {
    // 因为有可能是异步落于钩子函数或组件，所以需要返回一个promise
    // 以便服务器能够等待所有的内容在渲染前
    // 就已经准备就绪
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()

        // 设置服务端router的位置
        router.push(context.url)

        // 等到router将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行reject函数返回404
            if(!matchedComponents) {
                return reject({code: 404})
            }

            // 对所有匹配的路由组件调用 asyncData()
            Promise.all(matchedComponents.map(Component => {
                if(Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // 在所有预取钩子（preFetch hook) resolve后
                // 我们的store现在已经填充入渲染应用程序所需的状态
                // 当我们将状态附加到上下文
                // 并且template选项用于renderer时
                // 状态将自动序列化 window.__INITIAL_STATE__ 并注入HTML
                context.state = store.state
                resolve(app)
            }).catch(reject)

            // Promise 应该resolve应用程序实例，以便它可以渲染
            // resolve(app)
        }, reject)
    })
}