/**
 * 通用entry
 * 在纯客户端中将在此文件中创建根Vue实例，并挂载到DOM
 * 在服务端渲染中负责转移到纯客户端entry文件
 *  */

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store/index'
import {sync} from 'vuex-router-sync'

// 导出一个工厂函数，用于创建新的应用程序、router、store实例
export function createApp() {
    const router = createRouter()
    const store = createStore()

    // 同步路由状态（router state) 到 store
    sync(store, router)

    const app = new Vue({
        router, // 注入router
        store,
        render: h => h(App)
    })

    return { app, router, store }
}
