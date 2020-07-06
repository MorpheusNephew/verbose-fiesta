using pdftron.Filters;
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

            var fileDirectory = Directory.GetParent(inputFilePath).FullName;
            var fileWithoutExtension = Path.GetFileNameWithoutExtension(inputFilePath);
            var outputFilePath = Path.Combine(fileDirectory, $"{fileWithoutExtension}.pdf");

            using var mappedFile = new MappedFile(inputFilePath);
            using var filterReader = new FilterReader(mappedFile);

            using var stream = OfficeConverter.ConvertToPDF(filterReader);

            using var outputStream = new FileStream(outputFilePath, FileMode.Create, FileAccess.Write);

            stream.Position = 0;
            stream.CopyTo(outputStream);
        }
    }
}
