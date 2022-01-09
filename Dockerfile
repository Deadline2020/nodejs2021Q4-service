FROM node:16.13.1-alpine3.15
EXPOSE 4000
WORKDIR /usr/app

COPY package*.json .
RUN npm install --production

COPY . .
CMD [ "npm","start" ]
