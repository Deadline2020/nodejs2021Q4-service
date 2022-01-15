import 'reflect-metadata';
import { createConnection } from 'typeorm';

import app from './app';
import config from './common/config';
import typeORMConfig from './common/ormconfig';

// try {
//   app.listen(ENV.PORT as string, '0.0.0.0', () =>
//     process.stdout.write(`App is running on http://localhost:${ENV.PORT}\n`)
//   );
// } catch (error) {
//   process.stderr.write('Something went wrong\n');
//   app.log.error(error);
//   process.exit(1);
// }

createConnection(typeORMConfig)
  .then((connection) => {
    // here you can start to work with your entities
    console.log('!!!!!!!!!!!!!!!!!!!');
    app.listen(config.PORT as string, '0.0.0.0', () =>
      process.stdout.write(
        `App is running on http://localhost:${config.PORT}\n`
      )
    );
  })
  .catch((error) => {
    // console.log(error);
    process.stderr.write('Something went wrong\n');
    app.log.error(error);
    process.exit(1);
  });
