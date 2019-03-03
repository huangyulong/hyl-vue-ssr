import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 可以返回Promise的api
import { fetchItem } from './api/index'
import foo from './modules/foo'

export function createStore() {
    return new Vuex.Store({
        state: {
            items: []
        },
        actions: {
            fetchItem({commit}, id) {
                // store.dispatch() 会返回Promise
                // 以便我们能够知道数据在何时更新
                return fetchItem(id).then(item => {
                    commit('setItem', {id, item})
                })
            }
        },
        mutations: {
            setItem(state, {id, item}) {
                Vue.set(state.items, id, item)
            }
        }
    })
}
