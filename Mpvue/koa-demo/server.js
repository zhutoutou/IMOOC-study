const Koa = require('koa')
const koaLog = require('./koa-logger')
const Router = require('koa-router')

const app = new Koa()
const router = new Router();

router.get('/',(ctx,next)=>{
    ctx.body ='齐天大圣孙悟空'
})
router.get('/zhubajie',(ctx,next)=>{
    ctx.body ='猪八戒'
})

app.use(koaLog)
app
    .use(router.routes())
    .use(router.allowedMethods())

// app.use(async(ctx,next)=>{
//     if(ctx.request.url=='/'){
//         console.log('进去')
//         ctx.body ='齐天大圣孙悟空'
//     }
//     else if(ctx.request.url=='/zhubajie'){
//         ctx.body = '猪八戒'
//     }else{
//         ctx.body='<h1>404 Not Found</h1>'
//     }
//     next()
//     // ctx.body ='1'
//     // //下一个中间件
//     // await next()
//     // ctx.body += '2'
// })

app.listen(3000)