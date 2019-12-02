import * as Koa from 'koa';
import * as path from 'path';
import exception from './middleware/exception';
import routers from './routers/index';
import service from './services/index';

const http = require('http');
const logger = require('koa-logger');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const port = getPort();
const app = new Koa();
app.use(exception());
app.use(bodyParser());
app.use(serve(path.join(__dirname, '/public')));
app.use(async (ctx, next) => {
    if (ctx.request.path.indexOf('/modules') === 0) {
        ctx.request.path = ctx.request.path.replace('/modules', '');
        if (ctx.request.path.indexOf('server') === -1 && ctx.request.path.indexOf('web') === -1) {
            return await serve(path.join(__dirname, '../../'))(ctx, next);
        }
    }
    await next();
});
app.use(
    koaJson({
        pretty: false,
        param: 'pretty',
    }),
);
app.use(logger());
const server = http.createServer(app.callback());
routers(app);
server.listen(port, () => {
    console.log('启动服务成功，监听端口', port);
    service(app);
});
