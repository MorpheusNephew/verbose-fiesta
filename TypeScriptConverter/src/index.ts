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

const port = 3000;

app.listen(port, () => {
  console.log("You are now listening DJ Such and Such at", `http://localhost:${port}`);
});
