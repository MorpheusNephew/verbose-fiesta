import express from 'express';
import multer from 'multer';
import { convertToPdf } from "./converter";

var app = express();

app.get('/', (_, res) => {
  res.json("Hello World!!!");
});

const storage = multer.memoryStorage();
const upload = multer({storage});

app.post("/", upload.single('officeFile'), async (req, res) => {
  const convertedPdfBytes = await convertToPdf(req.file.buffer);
  res.send(convertedPdfBytes);
});

const port = 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Listening at http://${host}:${port}`);
});
