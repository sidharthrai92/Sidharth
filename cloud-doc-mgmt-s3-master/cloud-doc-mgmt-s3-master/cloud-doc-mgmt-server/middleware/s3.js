const {
  PutObjectCommand,
  S3Client,
  HeadObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const path = require('path');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { CLIENTPARAMS } = require('../constants/constants');

//GetCommands Get From S3
async function getPresignedUrl(bucket, key) {
  if (!key) {
    throw new Error('Error generating pre-signed URL: No key value');
  }

  try {
    const headParams = {
      Bucket: bucket,
      Key: key,
    };
    const headCommand = new HeadObjectCommand(headParams);
    const s3Client = new S3Client(CLIENTPARAMS);
    await s3Client.send(headCommand);

    const contentType = determineContentTypeFromKey(key);
    const params = {
      Bucket: bucket,
      Key: key,
      Expires: 900,
      ResponseContentType: contentType,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    return url;
  } catch (error) {
    if (error.name === 'NotFound') {
      throw new Error(
        `Object with key ${key} not found on S3: ${error.message}`
      );
    } else {
      throw new Error(
        `Error occurred in "middlewares/s3.js - getPresignedUrl()": ${error.message}, key: ${key}`
      );
    }
  }
}
//PutCommands Uplaod To S3
async function uploadToS3(bucket, key, fileBuffer, contentTypeReceived) {
  if (!bucket || !key || !fileBuffer) {
    throw new Error(
      'Bucket, key, and fileBuffer are required to upload to S3.'
    );
  }

  try {
    let contentType = contentTypeReceived || determineContentTypeFromKey(key);

    const params = {
      Bucket: bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: String(contentType),
    };

    const command = new PutObjectCommand(params);
    const s3Client = new S3Client(CLIENTPARAMS);
    const uploadResult = await s3Client.send(command);

    return { uploadResult };
  } catch (error) {
    throw new Error(`Error uploading to S3: ${error.message}`);
  }
}
//DeleteCommands From S3
async function deleteObjectFromS3(bucket, key) {
  if (!bucket || !key) {
    throw new Error('Bucket and key are required to delete an object from S3.');
  }

  const s3Client = new S3Client(CLIENTPARAMS);

  try {
    // Check if the object exists
    const headParams = {
      Bucket: bucket,
      Key: key,
    };
    const headCommand = new HeadObjectCommand(headParams);
    await s3Client.send(headCommand);

    const deleteParams = {
      Bucket: bucket,
      Key: key,
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    const deleteResult = await s3Client.send(deleteCommand);
    return deleteResult;
  } catch (error) {
    if (error.name === 'NotFound') {
      throw new Error(
        `Object with key ${key} not found on S3: ${error.message}.`
      );
    } else {
      throw new Error(`Error processing request: ${error.message}`);
    }
  }
}
//DetermineContentType of Keys
function determineContentTypeFromKey(key) {
  const ext = path.extname(key);
  const contentTypeMap = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
  };
  const contentType =
    contentTypeMap[ext.toLowerCase()] || 'application/octet-stream';
  return contentType;
}

module.exports = { uploadToS3, getPresignedUrl, deleteObjectFromS3 };
