const { PORT } = require('./common/config');
const app = require('./app');

try {
  app.listen(PORT, () =>
    process.stdout.write(`App is running on http://localhost:${PORT}\n`)
  );
} catch (error) {
  process.stderr.write('Something went wrong\n');
  app.log.error(error);
  process.exit(1);
}
