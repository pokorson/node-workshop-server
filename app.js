const koa = require('koa');
const cors = require('kcors');
const uuid = require('uuid/v1');
const bodyParser = require('koa-bodyparser');

const app = new koa();

let tweets = {};

app.use(cors());
app.use(bodyParser());
app.use(async ctx => {
  if (ctx.path === '/tweets') {
    const { user } = ctx.request.query;
    if (!user) {
      ctx.status = 401;
      ctx.body = 'no user provided';
    } else {
      ctx.status = 200;
      ctx.body = {
        tweets: tweets[user],
      };
    }
  } else if (ctx.path === '/createTweet') {
    const { tweet } = ctx.request.body;
    const { user } = ctx.request.query;

    if (!user || (!tweet && !tweet.title)) {
      ctx.status = 400;
      ctx.body = 'bad request';
    } else {
      if (!tweets[user]) {
        tweets[user] = [];
      }
      tweet['uuid'] = uuid();
      tweets[user] = [...tweets[user], tweet];
      ctx.status = 201;
      ctx.body = tweet;
    }
  } else {
    ctx.body = 'hello';
    ctx.status = 200;
  }
});

app.listen(3000);
