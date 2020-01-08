module.exports = {
  // 빌드시 소스맵 파일 생성 안함
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/dist'
}
