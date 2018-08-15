const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    try {
        const {bookid, openid} = ctx.request.query
        const mysqlSelect = mysql('cComment')
                                .select('cComment.*', 'cSessionInfo.user_info')
                                .join('cSessionInfo', 'cComment.openid', 'cSessionInfo.open_id')
        let comments
        if (bookid) {
            // 根据图书获取
            comments = await mysqlSelect
                                    .where('bookid', bookid)
        } else if (openid) {
            // 根据个人获取
            comments = await mysqlSelect
                                .where('openid', openid)
        }
        ctx.state.data = {
            list: comments.map(v => {
                const info = JSON.parse(v.user_info)
                return Object.assign({}, v, {
                    user_info: {
                        title: info.nickName,
                        image: info.avatarUrl
                    }
                })
            })
        }
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
