<template>
    <div>{{ item.title }}</div>
</template>

<script>
    import fooStoreModule from '../store/modules/foo.js'
    import titleMixin from '../title-mixin.js'

    export default {
        mixins: [titleMixin],
        title() {
            return this.item.title
        },
        asyncData({store, route}){
            // 触发action后会返回Promise
            store.registerModule('foo', fooStoreModule)
            return store.dispatch('fetchItem', route.params.id)
        },
        // 当多次访问路由时避免在客户端重复注册模块
        destroyed(){
            this.$store.unregisterModule('foo')
        },
        computed: {
            // 从 store 的state对象中获取item
            item() {
                return this.$store.state.items[this.$route.params.id]
            }
        } 
    }
</script>
