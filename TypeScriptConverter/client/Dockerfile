FROM node:12.18.2-slim

WORKDIR /usr/src/app

COPY ./build/ .

RUN yarn install

RUN yarn global add serve

EXPOSE 8080

ENTRYPOINT [ "serve", "-s", ".", "-l", "8080" ]