import { PDFNet } from "@pdftron/pdfnet-node";

const convertToPdf = async function (buffer) {
  await PDFNet.initialize();

  var Convert = PDFNet.Convert;
  const doc = await Convert.office2PDF(buffer);

  const byteArray = await doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_linearized);

  return Buffer.from(byteArray);
};

export { convertToPdf };
