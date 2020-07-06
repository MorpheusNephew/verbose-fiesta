using Amazon.Lambda.TestUtilities;
using pdftron.Filters;
using System.IO;
using Xunit;

namespace PDFTronOfficeConverter.Lambda.Tests
{
    public class FunctionTest
    {
        [Fact]
        public void TestConvertToPDFFunction()
        {
            pdftron.PDFNet.Initialize();
            var filePath = Path.Join("Resources", "Report.docx");

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException();
            }

            var mappedFile = new MappedFile(filePath);
            var filterReader = new FilterReader(mappedFile);

            // Invoke the lambda function and confirm the stream
            var function = new Function();
            var context = new TestLambdaContext();

            var stream = function.FunctionHandler(filterReader, context);

            Assert.True(stream.Length > 0);
        }
    }
}
