const koa = require('koa');

const CONFIG = require('./config/config');
const apiRouter = require('./src/routes');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');


const app = new koa();


//允许跨域
// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*'); // 很奇怪的是，使用 * 会出现一些其他问题
//     ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
//     ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH');
//     await next();
// });

app.use(cors());
app.use(bodyParser());
app.use(apiRouter.routes());
app.listen(CONFIG.port);

//防止程序因为异常宕机
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});



console.log('AMS_BACKEND is running at port '+CONFIG.port );




