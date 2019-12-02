import Router from 'koa-router';
import tpl from './tpl';

const router = new Router();
tpl(router);

export default function(app) {
    app.use(router.routes()).use(router.allowedMethods());
}
