const http = require('axios')

async function test () {
  let res = await http.post('http://localhost:50291/api/Values', {
    name: '张三',
    sex: '性别'
  })
  console.log(res)
}

test()
