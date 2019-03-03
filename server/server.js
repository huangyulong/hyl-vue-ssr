const createApp = require('../client/app')
const server = require('express')()
// const renderer = require('vue-server-render').createRenderer()
const { createBundleRenderer } = require('vue-server-renderer')
const template = require('fs').readFileSync('/public/template.html', 'utf-8')
const serverBundle = require('/public/vue-ssr-server-bundle.json')
const clientManifest = require('/public/vue-ssr-client-manifest.json')


const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template, // （可选）页面模板
    clientManifest, // (可选) 客户端构建manifest
})

server.get('*', (req,res) => {
    const context = {url: req.url}

    /* createApp(context).then(app => {
        renderer.renderToString(app, (err, html) => {
            if(err) {
                if(err.code === 404) {
                    res.status(404).end('Page not found')
                } else {
                    res.status(500).end('Internal Server Error')
                }
            } else {
                res.end(html)
            }
        })
    }) */

    // 这里无需传入一个应用程序，因为在执行bundle时已经自动创建过
    // 现在我们的服务器于应用程序已经解耦
    renderer.renderToString(context, (err, html) => {
        // 处理异常
        res.end(html)
    })
})

server.listen(8080)
