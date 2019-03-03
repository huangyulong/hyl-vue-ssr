function getTitle(vm) {
    // 组件可以提供一个title选项
    // 此选项可以时又给字符串或者函数
    const { title } = vm.$options
    if(title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

const serverTitleMixin = {
    created() {
        const title = getTitle(this)
        if(title) {
            this.$ssrContext.title = title
        }
    }
}

const clientTitleMixin = {
    mounted() {
        const title = getTitle(this)
        if(title) {
            document.title = title
        }
    }
}

// 可以通过webpack.definePlugin 注入 VUE_ENV
export default process.env.NODE_ENV === 'server'
    ? serverTitleMixin
    : clientTitleMixin