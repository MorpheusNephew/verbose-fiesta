using Amazon.Lambda.Core;
using pdftron.Filters;
using System.IO;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace PDFTronOfficeConverter.Lambda
{
    public class Function
    {
        
        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public Stream FunctionHandler(MappedFile input, ILambdaContext context)
        {
            return OfficeConverter.ConvertToPDF(input);
        }
    }
}
