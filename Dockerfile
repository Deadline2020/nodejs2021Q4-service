FROM node:16.13.1-alpine3.15
EXPOSE ${PORT}
WORKDIR /usr/app

COPY package*.json .
RUN npm install --production

COPY . .
CMD [ "npm","start" ]
