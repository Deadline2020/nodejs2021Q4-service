# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/).

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application using Docker

Open new terminal and enter:

```
docker-compose up
```

## Running application without Docker

Open new terminal and enter:

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Load testing reports

### Express

|                        |                            |                         |
| ---------------------- | -------------------------- | ----------------------- |
| Users                  | created, completed         | 3362, 2796              |
| Http requests          |                            | 15094                   |
| Http responses         | 200, 201, 204              | 8662, 3070, 2796        |
| Errors ETIMEDOUT       |                            | 566                     |
| Http response time, ms | mni, max, median, p95, p99 | 0, 9999, 60, 9607, 9999 |

### Fastify

|                        |                            |                        |
| ---------------------- | -------------------------- | ---------------------- |
| Users                  | created, completed         | 3377, 3114             |
| Http requests          |                            | 16093                  |
| Http responses         | 200, 201, 204              | 9472, 3244, 3114       |
| Errors ETIMEDOUT       |                            | 263                    |
| Http response time, ms | mni, max, median, p95, p99 | 0, 9999, 0, 8521, 9801 |

Additional information can be found in test-report folder
