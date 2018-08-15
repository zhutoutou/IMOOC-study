
const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
    try {
        const {page, openid} = ctx.request.query
        const size = 10
        let mysqlSelect = mysql('cBook')
                            .select('cBook.*', 'cSessionInfo.user_info')
                            .join('cSessionInfo', 'cBook.openId', 'cSessionInfo.open_id')
        if (openid) {
            mysqlSelect = mysqlSelect
                            .where('openid', openid)
        }
        let offset = Number(page) * size || 0
        const books = await mysqlSelect
                            .limit(size)
                            .offset(offset)
                            .orderBy('cBook.id', 'desc')
        console.log(books)
        ctx.state.data = {list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })}
    } catch (err) {
        console.log(err)
        ctx.state = {
            code: -1,
            data: {
                msg: err
            }
        }
    }
}
