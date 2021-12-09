import app from './app';
import ENV from './common/config';

try {
  app.listen(ENV.PORT as string, () =>
    process.stdout.write(`App is running on http://localhost:${ENV.PORT}\n`)
  );
} catch (error) {
  process.stderr.write('Something went wrong\n');
  app.log.error(error);
  process.exit(1);
}
