using pdftron.Filters;
using pdftron.PDF;
using pdftron.SDF;
using System.IO;

namespace PDFTronOfficeConverter
{
    public static class OfficeConverter
    {
        public static Stream ConvertToPDF(MappedFile mappedFile)
        {
            using var pdfDoc = new PDFDoc();

            Convert.OfficeToPDF(pdfDoc, mappedFile, null);

            var memoryStream = new MemoryStream();

            pdfDoc.Save(memoryStream, SDFDoc.SaveOptions.e_linearized);

            return memoryStream;
        }
    }
}
