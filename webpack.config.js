module.exports = { 
    name: 'client-side rendering',
    entry: './index.jsx',
    output: {
        filename: 'bundle.js'

    },  
    module: {
        loaders: [
            {   
                //Helps webpack to load all jsx files using jsx-loader
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }   
        ]   
    },  
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: { 
        extensions: ['', '.js', '.jsx']
    } 
 }