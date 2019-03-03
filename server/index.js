const Vue = require('vue')
const server = require('express')()

const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: '<div>访问的URL是：{{ url }}</div>'
    })

    const context = {
        title: 'hello',
        meta: `
            <meta name='viewport' content='width=device-width, initial-scale=1.0, max-scale=1.0, min-scale=1.0', user-scale=no />
            <meta charset='utf-8'/>    
            <meta http-equiv='X-UA-Compatible' content='ie=Edge,chrome=1' />
        `
    }
    
    renderer.renderToString(app, context, (err, html) => {
        if(err) {
            res.status(500).end('Internal Server Error')
        }
        res.end(context)
    })
})

server.listen(8080)
