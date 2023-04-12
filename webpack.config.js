var path = require("path");

module.exports = {
    entry: "./src/app.jsx",
    output:{
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        compress: true,
        port: 8081,
        open: true
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|woff(2)?|eot|ttf|otf)$/,
                type: "asset/resource"
            },
            // {
            //     test: /\.svg$/,
            //     use: ["@svgr/webpack", "url-loader"],
            // },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    }
}