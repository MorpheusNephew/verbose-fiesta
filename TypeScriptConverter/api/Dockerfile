FROM node:12.18.2-slim

WORKDIR /usr/src/app

COPY ./build/ .

RUN yarn install

EXPOSE 3333

ENTRYPOINT [ "node", "index.js" ]

