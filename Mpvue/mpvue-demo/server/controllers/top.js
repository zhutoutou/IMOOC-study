const {mysql} = require('../qcloud')
const size = 9
module.exports = async (ctx) => {
    try {
        const tops = await mysql('cBook')
            .select('id', 'title', 'image', 'count')
            .orderBy('count', 'desc')
            .limit(size)
        ctx.state.data = {list: tops}
    } catch (err) {
        ctx.state = {
            code: -1,
            data: {
                msg: err
            }
        }
    }
}
