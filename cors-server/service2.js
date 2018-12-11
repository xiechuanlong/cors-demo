const KOA = require('koa');
var router = require('koa-router')();
const  koaStatic = require('koa-static');
const fs = require('fs')
const path = require('path')
const cors= require('koa-cors')
class App {
    constructor() {
        this.app = new KOA()
        this.init()
    }

    init() {
        const staticMiddle = koaStatic(path.resolve('../static'))
        this.app.use(staticMiddle)
        this.app.use(cors({
            origin: 'http://127.0.0.1:8088',
            methods: 'GET,POST,PUT,DELETE',
            credentials: true, // 设置cookie的
            // headers: ['cors-test'], // 设置headers的
            // maxAge: 10,
            // expose: 
        }))
        this.router()
    }

    router() {
        router.get('/', async function(ctx, next){
            const file = fs.readFileSync('../client/index2.html', 'utf-8')
            ctx.body = file;
            next()
        })
        router.get('/corsapi/demo1', async function(ctx, next){
            ctx.body = {demo: 'get'}
            next()
        })
        router.post('/corsapi/demo1', async function(ctx, next){
            ctx.body = {demo: 'post'}
            next()
        })
        router.put('/corsapi/demo1', async function(ctx, next){
            ctx.body = {method: 'put'}
            next()
        })
        router.delete('/corsapi/demo1', async function(ctx, next){
            ctx.body = {method: 'put'}
            next()
        })
        router.post('/corsapi/demo2', async function(ctx, next){
            ctx.body = {demo: 'post', cookie: {test: ctx.cookies.get('test')}}
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

new App().listen(8089)