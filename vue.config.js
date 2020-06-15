module.exports = {
    assetsDir: 'static',
    publicPath:'./',
    outputDir:'dist',
    productionSourceMap: false,
    devServer: {   
        port:4040,
        proxy: {
            '/api':{
                target:'http://localhost:8080',
                autoOpenBrowser:true,
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}