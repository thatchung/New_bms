/** runner chạy server, chạy bằng npm script, xem package.json để biết chi tiết lệnh */

const { Nuxt, Builder } = require('nuxt');
const nuxt = new Nuxt(require('../../nuxt.config.js'));
let Config = require('../config');

module.exports = (async () => {
    let { api_server, document_server } = require('./init');
    let MainLogger = require('./main_logger');
    
    if (Config.node_env == 'development'){
        const builder = new Builder(nuxt);
        builder.build().catch(e => {
            console.error(e) // eslint-disable-line no-console
            process.exit(1)
        })
    } else {
        await nuxt.ready();
    }




    // api path will not render nuxt
    api_server.koa.use(async (ctx,next) => {
        if(ctx.req.url.includes("/api"))
        {
            await next();
        }
        else{
            ctx.status = 200;
            ctx.respond = false;
            ctx.req.ctx = ctx;
            nuxt.render(ctx.req, ctx.res);
        }
    })


    // khởi chạy api server
    await api_server.start();
    MainLogger.info(`api server is listening at ${api_server.options.port}`);

    // khởi tạo document server
    if (Config.document.enable) {
        await document_server.start();
        MainLogger.info(`document server is started at ${document_server.options.port}`);
    }
})();
