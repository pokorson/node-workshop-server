const koa = require('koa');
const cors = require('kcors');
const uuid = require('uuid/v1');
const bodyParser = require('koa-bodyparser');

const app = new koa();

let todos = [
  { title: 'learn elm', id: 1, completed: false, },
  { title: 'write elm app', id: 2, completed: false },
  { title: 'start using elm at work', id: 3, completed: false }
];

const meta = {
  requestCount: 0
}

app.use(cors());
app.use(bodyParser());

app.use(async ctx => {
  if (ctx.path === '/todos') {
    meta.requestCount = meta.requestCount + 1;
    ctx.body = todos;
  }

  if (ctx.path === '/createTodo') {
    todos = [...todos, {
      title: ctx.request.body.title,
      id: todos.length > 0 ? todos.reverse()[0].id + 1 : 1
    }]
    ctx.response.status = 201;
  }
});

app.listen(3030);
