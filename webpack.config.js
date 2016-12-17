/**
 * Created by maple on 16-12-16.
 */
var webpack =require('webpack');
var commonsPlugin= new webpack.optimize.CommonsPlugin('common.js');
module.exports={
  //插件项
    plugins:[commonsPlugin],
  //页面入口文件输出配置
    entry:{
        index:'dist/js/page/index.js'
    },
    // 入口文件输出设置
    output:{
        path:'dist/js/page',
        filename:'[name].js'
    },
    module:{
        // 加载器配置
        loaders:[
            {test:/.\.css$/,loader:'style!css'},
            //从后往前查看
            {test:/.\.js$/,loader:'jsx?harmony'},
            {test:/.\.scss$/,loader:'style!css!sass?sourceMap'},
            {test:/.\.(png|jpg)$/,loader:'url?limit=8192'}
            //当图片小于8192b时，将图片转化为base64的形式
        ]
    }
};