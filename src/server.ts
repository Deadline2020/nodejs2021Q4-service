import 'reflect-metadata';
import { createConnection } from 'typeorm';

import app from './app';
import config from './common/config';
import typeORMConfig from './common/ormconfig';
import { setDefaultAdmin } from './resources/users/user.service';

createConnection(typeORMConfig)
  .then(() => {
    setDefaultAdmin(config.ADMIN_DEFAULT_LOGIN, config.ADMIN_DEFAULT_PASSWORD);
  })
  .then(() => {
    app.listen(config.PORT as string, '0.0.0.0', () =>
      process.stdout.write(
        `App is running on http://localhost:${config.PORT}\n`
      )
    );
  })
  .catch((error) => {
    process.stderr.write('Something went wrong\n');
    app.log.error(error);
    process.exit(1);
  });
