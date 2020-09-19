import { isNil } from "lodash";

import Router from "@koa/router";
import Multer from "@koa/multer";

import { convertToPdf } from "./converter";

const router = new Router();
const storage = Multer.memoryStorage();
const upload = Multer({ storage: storage });

router.get("/", (ctx) => {
  ctx.body = "Hello world!!! (koa)";
});

router.post("/", upload.single("officeFile"), async (ctx) => {
  if (isNil(ctx.file?.buffer)) {
    ctx.throw(400, "File with form name officeFile was not found.");
  } else {
    const convertedPdfBytes = await convertToPdf(ctx.file.buffer);

    ctx.body = convertedPdfBytes;
  }
});

export default router;
