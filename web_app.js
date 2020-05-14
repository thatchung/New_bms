
const { Nuxt, Builder } = require('nuxt')
var express = require('express');
var app = express();
let conf = require('./nuxt.config.js')
const port = 3000;
const env = "development";
// We instantiate Nuxt.js with the options

const nuxt = new Nuxt(conf)
app.use(nuxt.render)

// Build only in dev mode
if (env === 'local' || env === 'development') {
    new Builder(nuxt).build()
}

// Listen the server
app.listen(port, '0.0.0.0')

module.exports = app;