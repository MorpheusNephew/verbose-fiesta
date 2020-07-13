import { PDFNet } from '@pdftron/pdfnet-node';
import { Context } from 'aws-lambda';

var Filter = PDFNet.Filter;


const handler = async function(event, context: Context) {
    return helloWorld();
};

const helloWorld = () => {
    return "Hello world!!!";
}

export { handler };