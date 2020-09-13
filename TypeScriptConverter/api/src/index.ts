import Koa from "koa";
import cors from "@koa/cors";
import json from "koa-json";

import router from "./routes";

const koa = new Koa();

koa.use(cors());
koa.use(json());
koa.use(router.routes());

const port = 3333;

koa.listen(port);

console.log(`Service currently running on port ${port}`);
