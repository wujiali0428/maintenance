module.exports = {
//  devServer: {
//     host: 'localhost',
//     port: 8089
//   }
 lintOnSave: false,  //关闭代码校验
  devServer: {

    port:8090,
    proxy: {
        '/v5': { //如果请求api的话 改下面的配置
            target: 'https://mys4s.cn/grey/', //转发端口
            changOrigin: "true", 
           //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        }
    }
  },
  publicPath: './',
}