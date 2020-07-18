import { S3 } from "aws-sdk";
import { Credential } from "../core/Credential";
import { GetObjectRequest, GetObjectOutput, DeleteObjectRequest, DeleteObjectOutput, DeleteObjectsRequest, ObjectIdentifier, DeletedObjects, PutObjectRequest } from "aws-sdk/clients/s3";
import { v4 as uuid } from 'uuid';
import fs from 'fs';

export class S3Light{
    private s3:S3;

    constructor(){
        const {accessKeyId, secretAccessKey, region} = Credential.getOptions();
        this.s3 = new S3({
            accessKeyId, 
            secretAccessKey, 
            region
        });
    }

    getObject(bucketName: string, key: string): Promise<GetObjectOutput>{
        const objectRequest: GetObjectRequest = {
            Bucket: bucketName,
            Key: key
        };
        return new Promise((resolve, reject) => {
            this.s3.getObject(objectRequest, (err, data) => {
                if(err){
                    return reject(err?.message);
                }
                return resolve(data);
            });
        });
    }

    upload(bucketName: string, file: any): Promise<S3.Types.ManagedUpload.SendData>{
        let putObjRequest: PutObjectRequest = {
            Bucket: bucketName,
            Key:  uuid(),
            ContentType: file.type
        }
        let fileStream = fs.createReadStream(file.path);
        putObjRequest.Body = fileStream;
        return new Promise((resolve, reject)=> {
            this.s3.upload(putObjRequest, (err, data) => {
                if (err) {
                    return reject(err?.message);                    
                } 
                return resolve(data);
            });
        });
    }

    deleteObject(bucketName: string, key: string): Promise<DeleteObjectOutput>{
        const delObjRequest: DeleteObjectRequest = {
            Bucket: bucketName,
            Key: key
        };
        return new Promise((resolve, reject)=> {
            this.s3.deleteObject(delObjRequest, (err, data) => {
                if (err) {
                    return reject(err?.message);                    
                } 
                return resolve(data);
            });
        });
    }

    deleteObjects(bucketName: string, keys: ObjectIdentifier[]): Promise<DeletedObjects>{
        const delObjsRequest: DeleteObjectsRequest = {
            Bucket: bucketName,
            Delete: { Objects: keys }
        };
        return new Promise((resolve, reject)=> {
            this.s3.deleteObjects(delObjsRequest, (err, data) => {
                if (err) {
                    return reject(err?.message);                    
                } 
                return resolve(data.Deleted);
            });
        });
    }
}