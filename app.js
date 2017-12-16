const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Serve = require('koa-static');

const Switch = require('./routes/switch');
const Brightness = require('./routes/brightness');

const port = 3000;
const app = new Koa();
const router = new Router();

app
   .use(BodyParser())
   .use(router.routes())
   .use(router.allowedMethods())
   .use(Serve(__dirname + '/public'));

router
   .use('/api/switch', Switch.routes(), Switch.allowedMethods())
   .use('/api/brightness', Brightness.routes(), Brightness.allowedMethods());

app.listen(port, () => {
   console.log(`Server running at localhost:${port}`);
});
