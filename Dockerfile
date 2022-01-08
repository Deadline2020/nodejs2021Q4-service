FROM node:16.13.1-alpine3.15
EXPOSE 4000
WORKDIR /usr/app/src

COPY package*.json .
RUN npm install

COPY . .
CMD [ "npm","start" ]
