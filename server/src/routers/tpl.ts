import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

const home = async function(ctx) {
    if (process.env.NODE_ENV === 'development') {
        const { data } = await axios.get('http://localhost:3000/', {
            responseType: 'stream',
        });
        ctx.body = data;
    } else {
        ctx.body = fs.readFileSync(path.join(__dirname, '../../public/index.html'));
    }
    ctx.set('content-type', 'text/html');
};

export default function(router) {
    router.get('/', home);
}
