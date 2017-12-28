const Koa = require('koa');
const app = new Koa();
const Port = 1337;

app.use(async ctx => {
  ctx.body = 'Hello World!';
});

app.listen(Port);
console.log(`Listening on port ${Port}...`)
