using pdftron;
using pdftron.Filters;
using pdftron.PDF;
using pdftron.SDF;
using System.IO;

namespace PDFTronOfficeConverter
{
    public static class OfficeConverter
    {
        static OfficeConverter()
        {
            PDFNetLoader.Instance();
            PDFNet.Initialize();
        }

        public static Stream ConvertToPDF(Stream stream)
        {
            using var filter = ConvertStreamToFilter(stream);

            using var pdfDoc = new PDFDoc();

            Convert.OfficeToPDF(pdfDoc, filter, null);

            var memoryStream = new MemoryStream();

            pdfDoc.Save(memoryStream, SDFDoc.SaveOptions.e_linearized);

            return memoryStream;
        }

        private static Filter ConvertStreamToFilter(Stream stream)
        {
            using var memoryStream = new MemoryStream();
            stream.CopyTo(memoryStream);

            var byteArray = memoryStream.ToArray();

            var memoryFilter = new MemoryFilter(byteArray.Length, false);
            using var filterWriter = new FilterWriter(memoryFilter);

            filterWriter.WriteBuffer(byteArray);
            memoryFilter.SetAsInputFilter();

            return memoryFilter;
        }
    }
}
