const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    try {
        const {bookid, openId, comment, location, phone} = ctx.request.body
        await mysql('cComment')
            .insert({bookid, openId, comment, location, phone})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (err) {
        ctx.state = {
            code: -1,
            data: {
                msg: '新增失败' + (err.sqlMessage || '')
            }
        }
    }
}
