const https = require('https')
const {mysql} = require('../qcloud')
// 新增图书
// 1. 获取豆瓣信息
// 2. 入库
// https://api.douban.com/v2/book/isbn/:name
module.exports = async(ctx, next) => {
    const {isbn, openId} = ctx.request.body
    console.log('添加图书', isbn, openId)
    if (isbn && openId) {
        try {
            const findRes = await mysql('cBook').select().where('isbn', isbn)
            if (findRes.length) {
                ctx.state = {
                    code: -1,
                    data: {
                        msg: '图书已存在'
                    }
                }
                return
            }
            let url = 'https://api.douban.com/v2/book/isbn/' + isbn

            const bookinfo = await getJSON(url)
            const rate = bookinfo.rating.average
            const {title, image, alt, publisher, summary, price} = bookinfo
            // tag: 科幻 1000,小说 500
            const tags = bookinfo.tags.map(v => {
                return `${v.title} ${v.count}`
            }).join(',')
            const author = bookinfo.author.join(',')
            try {
                await mysql('cBook').insert({
                    isbn, openId, rate, title, image, alt, publisher, summary, price, tags, author
                })
                ctx.state.data = {
                    title,
                    msg: 'success'
                }
            } catch (err) {
                throw err
            }
        } catch (err) {
            console.log(err)
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败' + (err.sqlMessage || '')
                }
            }
        }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
