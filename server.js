const koa = require('koa');
const cors = require('kcors');
const uuid = require('uuid/v1');
const bodyParser = require('koa-bodyparser');

const app = new koa();

let tweets = [
  { title: 'tweet 1', id: 1 },
  { title: 'tweet 2', id: 2 },
  { title: 'tweet 3', id: 3 },
  { title: 'tweet 4', id: 4 },
  { title: 'tweet 5', id: 5 },
  { title: 'tweet 6', id: 6 }
];

const meta = {
  requestCount: 0
}

app.use(cors());
app.use(bodyParser());
app.use(async ctx => {
  if (ctx.path === '/tweets') {
    meta.requestCount = meta.requestCount + 1;
    ctx.body = tweets;
  }
});

app.listen(3000);
