module.exports = async (ctx, next) => {
    ctx.state.data = {
        msg: '微信小程序后台'
    }
    next()
}
