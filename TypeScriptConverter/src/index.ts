import { PDFNet } from "@pdftron/pdfnet-node";

const handler = async function (payload, context) {
  return convertToPdf(payload);
};

const convertToPdf = async function (buffer) {
  await PDFNet.initialize();

  var Convert = PDFNet.Convert;
  const doc = await Convert.office2PDF(buffer);

  return doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_linearized);
};

export { handler };
