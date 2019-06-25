//  new webpack.ProvidePlugin({
//   $:'jquery' // 当webpack发现文件里有$这个变量时，会自动导入jquery这个模块
// })   会自动帮忙引入jquery

export function ui() {
  $('body').css('background', _.join(['yellow'], '')) // _join指lodash库里的 _.join
}