FROM node:12.18.2-slim

WORKDIR /usr/src/app

COPY ./build/ .

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "node", "index.js" ]

