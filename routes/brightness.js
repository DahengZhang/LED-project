const Router = require('koa-router');
const Gpio = require('pigpio').Gpio;
const router = new Router();
const LED = new Gpio(17, { mode: Gpio.OUTPUT });

router.post('/', (ctx) => {
   const light = ctx.request.body.light;
   if (light >= 0 && light <= 255) {
      LED.pwmWrite(light);
      ctx.body = {
         status: 0,
		 message: 'success'
      };
   } else {
      ctx.body = {
         status: 1,
         message: '发送参数不符合规定'
      };
   }
});

module.exports = router;
