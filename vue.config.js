const fs = require('fs')
const path = require('path')

function generateVersion () {
  function padding (n, len = 2) {
    n = n.toString()
    if (n.length < len) {
      let p = ''
      for (let i = 0; i < len - n.length; i++) {
        p += '0'
      }
      return p + n
    } else {
      return n
    }
  }

  const data = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
  const d = new Date()
  const y = d.getFullYear().toString().slice(2)
  const M = padding(d.getMonth() + 1)
  const D = padding(d.getDate())
  const m = padding(parseInt(d.getHours() * 60 / 2), 3)
  const s = padding(d.getSeconds())

  const v = {}
  v.product = JSON.parse(data).version
  v.build = `${y}${M}${D}${m}${s}`
  v.full = v.product + '.' + v.build

  return v
}

const VERSION = generateVersion()
console.log(JSON.stringify(VERSION, null, 2))

module.exports = {
  // 빌드시 소스맵 파일 생성 안함
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/dist',
  // 개발 프록시 서버 설정
  devServer: {
    proxy: `http://localhost:8080`,
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  },
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        const env = { ...args[0]['process.env'] }
        env.VERSION = JSON.stringify(VERSION.full)

        args[0] = {
          ...args[0],
          'process.env': env
        }
        return args
      })
  }
}
