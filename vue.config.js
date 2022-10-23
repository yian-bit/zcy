const { defineConfig } = require('@vue/cli-service')
const path=require('path')
function resolve(dir){
  return path.join(__dirname,dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
//  chainWebpack:(config)=>{

  // config.resolve.alias
  //   .set("@",resolve("./src"))
  //   .set("@components",resolve("./src/components"))
  //   .set("@assets",resolve("./src/assets"))
    configureWebpack:{
      resolve:{
        alias:{
          '@':resolve("./src"),
          "@components":resolve("./src/components"),
          "@assets":resolve("./src/assets")
      }
    }
 }
 
})
