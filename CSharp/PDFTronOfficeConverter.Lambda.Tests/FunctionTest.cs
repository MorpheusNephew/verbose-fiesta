using Amazon.Lambda.TestUtilities;
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

            using var fileStream = File.OpenRead(filePath);

            // Invoke the lambda function and confirm the stream
            var function = new Function();
            var context = new TestLambdaContext();

            var stream = function.FunctionHandler(fileStream, context);

            Assert.True(stream.Length > 0);
        }
    }
}
