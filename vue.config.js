module.exports = {
    lintOnSave: false,
    publicPath: './',
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/assets/css/varuables.scss` 这个文件
                prependData: `@import"@/style/index.scss";`
            }
        }
    }
}