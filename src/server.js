const { PORT } = require('./common/config');
const app = require('./app');

// app.listen(PORT, () =>
// console.log(`App is running on http://localhost:${PORT}`)
// );
try {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
} catch (error) {
  console.error('something went wrong');
  app.log.error(error);
  process.exit(1);
}
