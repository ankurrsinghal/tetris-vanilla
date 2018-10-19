module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}