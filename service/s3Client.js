const AWS = require('aws-sdk');
const fs = require('fs');

class S3Client {
    
    static async uploadFile(fileName, filePath, mimeType) {
        const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
        const fileContent = fs.readFileSync(filePath);
     
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
            Body: fileContent,
            ContentType: mimeType //geralmente se acha sozinho
        };
     
        const data = await s3.upload(params).promise();
        return data.Location;
    }
     
    static async listObjects(filter) {
        const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Prefix: decodeURIComponent(filter)
        };
     
        const result = await s3.listObjectsV2(params).promise();
        return result.Contents.map(item => item.Key);
    }

    static async deleteFromS3 (attachmentId) {
        const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
        return s3.deleteObject({ Bucket: process.env.AWS_S3_BUCKET, Key: attachmentId }).promise()
       }
}
 
 
module.exports = S3Client
