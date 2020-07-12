using Amazon.Lambda;
using Amazon.Lambda.Model;
using Newtonsoft.Json;
using pdftron.Filters;
using RestSharp;
using System.IO;
using System.Threading.Tasks;

namespace PDFTronOfficeConverter.LambdaInvocation
{
    class Program
    {
        async static Task Main(string[] args)
        {
            var filePath = Path.Combine("c:", "users", "14076", "Downloads", "Report.docx");

            using var fileStream = File.OpenRead(filePath);

            var invokeEndpoint = false;

            if (invokeEndpoint)
            {
                await InvokeViaEnpoint(fileStream);
            }
            else
            {
                await InvokeViaSdk(fileStream);
            }
        }

        async static Task InvokeViaEnpoint(Stream fileStream)
        {
            const string apiEndpoint = "http://localhost:4567/restapis/bzgl3oxp5d/v1/_user_request_";
            var request = new RestRequest("/convert", Method.POST).AddJsonBody(fileStream);

            var client = new RestClient(apiEndpoint);

            var responseStream = await client.ExecuteAsync(request);
        }

        async static Task InvokeViaSdk(Stream fileStream)
        {
            var lambdaConfig = new AmazonLambdaConfig
            {
                ServiceURL = "http://localhost:4566"
            };

            using var lambda = new AmazonLambdaClient(lambdaConfig);
            using var memoryStream = new MemoryStream();
            fileStream.CopyTo(memoryStream);

            var getFunctionRequest = new GetFunctionRequest
            {
                FunctionName = "ConverterTronStack-ConverterTronLambda-V6ZBU97Z5XM0"
            };

            var invokeRequest = new InvokeRequest
            {
                FunctionName = "ConverterTronStack-ConverterTronLambda-V6ZBU97Z5XM0",
                InvocationType = InvocationType.RequestResponse,
                PayloadStream = memoryStream
            };

            var getThings = await lambda.GetFunctionAsync(getFunctionRequest);

            var response = await lambda.InvokeAsync(invokeRequest);

        }
    }
}
