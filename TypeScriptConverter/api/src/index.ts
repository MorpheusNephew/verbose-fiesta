import express from "express";
import multer from "multer";
import cors from "cors";
import { isNil } from "lodash";
import { convertToPdf } from "./converter";

const app = express();

app.use(cors());

app.get("/", (_, res) => {
  res.json("Hello World!!!");
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/", upload.single("officeFile"), async (req, res) => {
  if (isNil(req.file?.buffer)) {
    res
      .sendStatus(400)
      .send("File with form name officeFile was not found.");
  }

  const convertedPdfBytes = await convertToPdf(req.file.buffer);
  res.send(convertedPdfBytes);
});

const port = 8080;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Listening at http://${host}:${port}`);
});
