

exports = async function(arg){
  
  console.log(arg);
  
        const body = JSON.parse(arg);
        // const fileContent = Buffer.from(body.file, 'base64');
        const fileName = body.fileName;
        
        console.log(fileContent);
        
        console.log(fileName);
  
  // const AWS = require('aws-sdk');
  // const s3 = new AWS.S3();
  
  //   try {
  //       // Decode the file from base64 and get the file name
  //       const body = JSON.parse(event.body);
  //       const fileContent = Buffer.from(body.file, 'base64');
  //       const fileName = body.fileName;

  //       // Define bucket and key (file name)
  //       const bucketName = 'sehealthprogressmonitor';
  //       const params = {
  //           Bucket: bucketName,
  //           Key: fileName,
  //           Body: fileContent
  //       };

  //       // Upload file to S3
  //       await s3.putObject(params).promise();

  //       return {
  //           statusCode: 200,
  //           body: JSON.stringify('File uploaded successfully')
  //       };
  //   } catch (error) {
  //       console.error('Error uploading file:', error);
  //       return {
  //           statusCode: 500,
  //           body: JSON.stringify('Error uploading file')
  //       };
  //   }
  

};