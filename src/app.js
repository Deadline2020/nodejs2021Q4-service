const fastify = require('fastify');

// const app = fastify({ logger: true });
const app = fastify();

app.register(require('./resources/users/user.router.js'));
app.register(require('./resources/boards/board.router.js'));
app.register(require('./resources/tasks/task.router.js'));

module.exports = app;
// const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');

// const app = express();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use(express.json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });

// app.use('/users', userRouter);

// module.exports = app;
