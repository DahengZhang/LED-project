const Router = require('koa-router');
const Gpio = require('pigpio').Gpio;
const router = new Router();
const LED = new Gpio(17, { mode: Gpio.OUTPUT });

router.post('/', (ctx) => {
   const status = ctx.request.body.status;
   switch (status) {
      case 0:
         LED.pwmWrite(0);
         ctx.body = {
            status: 0,
            message: '熄灭'
         };
         break;
      case 1:
         LED.pwmWrite(51);
         ctx.body = {
            status: 0,
            message: '点亮'
         };
         break;
      default:
         ctx.body = {
            status: 1,
            message: '参数有误'
         };
   }
});

module.exports = router;
