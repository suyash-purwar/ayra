import { 
  S3Client,
  ListBucketsCommand, 
  CreateBucketCommand,
  DeleteBucketCommand,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3client = new S3Client({ region: "ap-south-1" });

const streamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
  });
};

const listBuckets = async () => {
  try {
    const command = new ListBucketsCommand({});
    const response = await s3client.send(command);    
    console.log(response);
  } catch (e) {
    console.log(e.message);
    console.log(e);
  }
};

const createNewBucket = async (bucketName) => {
  try {
    const command = new CreateBucketCommand({
      Bucket: bucketName
    });
    const response = await s3client.send(command);
    console.log(response);
  } catch (e) {
    console.log(e.message);
    console.log(e);
  }
};

const deleteBucket = async (bucketName) => {
  try {
    const command = new DeleteBucketCommand({
      Bucket: bucketName
    });
    const response = await s3client.send(command);
    console.log(response);
  } catch (e) {
    console.log(e.message);
    console.log(e);
  }
};

export const addToBucket = async (folderPath, fileName, fileBuffer) => {
  try {
    const command = new PutObjectCommand({
      Bucket: 'student-media-assets',
      Key: `${folderPath}/${fileName}`,
      Body: fileBuffer,
      ContentType: 'application/pdf'
    });
    const response = await s3client.send(command);
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
};

const deleteObject = async () => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: 'student-media-assets',
      Key: 'testing.txt'
    });
    const response = await s3client.send(command);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

const listObjects = async () => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: 'student-media-assets'
    });
    const response = await s3client.send(command);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

const getObject = async () => {
  try {
    const chunks = [];
    const command = new GetObjectCommand({
      Bucket: 'student-media-assets',
      Key: ''
    });
    const { Body } = await s3client.send(command);
    const data = await streamToBuffer(Body);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const getObjectURL = async (folderPath, fileName) => {
  try {
    const command = new GetObjectCommand({
      Bucket: 'student-media-assets',
      Key: `${folderPath}/${fileName}`,
      ResponseContentDisposition: `inline; filename=${fileName}`
    });
    const url = await getSignedUrl(s3client, command, { expiresIn: 3600 });
    return url;
  } catch (e) {
    console.log(e);
  }
};