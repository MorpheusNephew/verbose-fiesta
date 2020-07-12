using System;
using System.IO;

namespace PDFTronOfficeConverter.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 1)
            {
                throw new ArgumentException("Must provide file path of office file");
            }

            var inputFilePath = args[0];

            if (!File.Exists(inputFilePath))
            {
                throw new FileNotFoundException();
            }

            using var fileStream = File.OpenRead(inputFilePath);

            using var stream = OfficeConverter.ConvertToPDF(fileStream);

            var fileDirectory = Directory.GetParent(inputFilePath).FullName;
            var fileWithoutExtension = Path.GetFileNameWithoutExtension(inputFilePath);
            var outputFilePath = Path.Combine(fileDirectory, $"{fileWithoutExtension}.pdf");

            using var outputStream = new FileStream(outputFilePath, FileMode.Create, FileAccess.Write);

            stream.Position = 0;
            stream.CopyTo(outputStream);
        }
    }
}
