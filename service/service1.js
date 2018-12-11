const KOA = require('koa');
var router = require('koa-router')();
const  koaStatic = require('koa-static');
const middlewares  = require('./middlewares/index.js')
const fs = require('fs')
const path = require('path')
class App {
    constructor() {
        this.app = new KOA()
        this.init()
    }

    init() {
        const staticMiddle = koaStatic(path.resolve('../static'))
        this.app.use(staticMiddle)
        middlewares.forEach(middleware => {
            this.app.use(middleware)
        })
        this.router()
    }

    router() {
        router.get('/', async function(ctx, next){
            const file = fs.readFileSync('../client/index1.html', 'utf-8')
            ctx.body = file;
            next()
        })
        router.get('/api/demo1', async function(ctx, next){
            ctx.body = {demo: 1}
            next()
        })
        router.post('/api/demo1', async function(ctx, next){
            ctx.response.set('auth','xiechuanlong')
            ctx.body = {demo: 1}
            next()
        })
        this.app.use(router.routes())
    }

    listen(port) {
        this.app.listen(port, (err) => {
            if(err) {
                throw new Error(err)
            }
            console.info(`服务器启动成功，监听端口${port}`)
        })
    }
}

new App().listen(8088)