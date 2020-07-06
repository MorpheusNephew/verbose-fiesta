using pdftron.Filters;
using pdftron.PDF;
using pdftron.SDF;
using System.IO;

namespace PDFTronOfficeConverter
{
    public static class OfficeConverter
    {
        public static Stream ConvertToPDF(FilterReader filterReader)
        {
            using var pdfDoc = new PDFDoc();

            Convert.OfficeToPDF(pdfDoc, filterReader.GetAttachedFilter(), null);

            var memoryStream = new MemoryStream();

            pdfDoc.Save(memoryStream, SDFDoc.SaveOptions.e_linearized);

            return memoryStream;
        }
    }
}
