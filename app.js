const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Serve = require('koa-static');
// const Gpio = require('pigpio').Gpio();

const port = 3000;
const app = new Koa();
const router = new Router();
// const LED = new Gpio(17, { mode: Gpio.OUTPUT });

app
   .use(BodyParser())
   .use(router.routes())
   .use(router.allowedMethods())
   .use(Serve(__dirname + '/public'));


router.post('/api', (ctx) => {
   ctx.body = '请求成功';
});

app.listen(port, () => {
   console.log(`Server running at localhost:${port}`);
});
