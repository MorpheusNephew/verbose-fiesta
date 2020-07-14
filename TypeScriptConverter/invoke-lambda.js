const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const lambdaParams = {
    apiVersion: '2015-03-31',
    region: "us-east-1",
    endpoint: "http://localhost:4566"
};

const lambda = new aws.Lambda(lambdaParams);
const fileStr = fs.readFileSync(path.join(__dirname, 'resources', 'report.docx'));

const functionParams = {
    FunctionName: 'my-lambda',
    Payload: JSON.stringify(fileStr)
};

lambda.invoke(functionParams, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        const parsedData = JSON.parse(data.Payload);

        if (data.FunctionError) {
            console.error(data.FunctionError, parsedData);
            return;
        }

        console.log('Data', parsedData);

        fs.writeFileSync(
            path.join(__dirname, "resources", "report.pdf"),
            parsedData
        );
    }
});
