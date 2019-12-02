import './config';
import Koa from 'koa';
import path from 'path';
import exception from './middleware/exception';
import routers from './routers/index';
import ws from './ws';

const http = require('http');
const logger = require('koa-logger');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const port = process.env.PORT;
const app = new Koa();
app.use(exception());
app.use(bodyParser());
app.use(serve(path.join(__dirname, '../public')));
app.use(
    koaJson({
        pretty: false,
        param: 'pretty',
    }),
);
app.use(logger());
const server = http.createServer(app.callback());
ws(server);
routers(app);
server.listen(port, () => {
    console.log('启动服务成功，监听端口', port);
});
