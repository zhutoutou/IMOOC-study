const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    const {id} = ctx.request.query
    await mysql('cBook')
            .where('id', id)
            .increment('count', 1)
    const detail = await mysql('cBook')
                            .select('cBook.*', 'cSessionInfo.user_info')
                            .join('cSessionInfo', 'cBook.openId', 'cSessionInfo.open_id')
                            .where('id', id)
                            .first()    // 返回对象而不是数组
    const info = JSON.parse(detail.user_info)
    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags === '' ? [] : detail.tags.split(','),
        summary: detail.summary.split(','),
        user_info: {
            nickName: info.nickName,
            image: info.avatarUrl
        }
    })
}
