const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Serve = require('koa-static');
const Gpio = require('pigpio').Gpio();

const app = new Koa();
const router = new Router();
const LED = new Gpio(17, { mode: Gpio.OUTPUT });

app
   .use(BodyParser())
   .use(router.routes())
   .use(router.allowedMethods())
   .use(Serve(__dirname + '/public'));


router.post('/api', (ctx) => {
   if (ctx.request.body.status === 0) {
      LED.digitalWrite(0);
      ctx.body = {
         status: 0,
         message: '熄灭'
      };
   } else if (ctx.request.body.status === 1) {
      LED.digitalWrite(1);
      ctx.body = {
         status: 0,
         message: '点亮'
      };
   } else {
      ctx.body = {
         status: 1,
         message: '参数有误'
      };
   }
});

app.listen(3000);
