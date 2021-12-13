const fastify = require('fastify');

const app = fastify();

app.register(require('./resources/users/user.router.js'));
app.register(require('./resources/boards/board.router.js'));
app.register(require('./resources/tasks/task.router.js'));

module.exports = app;
