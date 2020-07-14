# verbose-fiesta

Different implementations of converting Office documents to PDFs with PDFTron

## Notes

### July 13, 2020

Up to this point I've created converter applications in C# and Typescript. Also up to this point it appears that there are some issues running those applications within AWS Lambda. While I do have some gripes working with AWS Lambda, these issues that I've run into don't fall solely on the shoulders of Lambda. PDFTron appears to have issues, thus far, using their .NET core and Node implementations on a Linux device. In working with the .NET core version there were additional files that were required for the Linux implementation that needed to be added to the Lambda run path on creation of the lambda function. Still haven't fully figured that out yet. For the Node application the latest Node version that works with the node package is 12.x, also the npm packages must be installed from a Linux machine to work in Lambda (linux). I went the route of using Cloud9 since it creates an IDE environment on linux, but now I'm experiencing issues where the buffer I'm passing to the lambda function can't be read in Lambda. Next up on the list is Python.
