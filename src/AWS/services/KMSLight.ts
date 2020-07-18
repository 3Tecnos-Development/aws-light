
import { KMS } from "aws-sdk";
import { MapEnv } from "map-env-node";
import { IKMSARN } from "../interfaces/IKMSARN";
import { Credential } from "../core/Credential";
 export class KMSLight{
    private kms:KMS;
    private kmsArn:IKMSARN;

    constructor(){
        const {accessKeyId, secretAccessKey, region} = Credential.getOptions();
        this.kms = new KMS({
            accessKeyId, 
            secretAccessKey, 
            region
        });
    }

    private getARNDefault():string{
        if(!this.kmsArn){
            let kmsArn = MapEnv.get<IKMSARN>("AWS_KMS_ARN");
            if(!kmsArn.default){
                throw new Error("O ARN default do KMS não está definido.");
            }
        }
        return this.kmsArn.default;
    }

    async encrypt(plainText:string, arnKeyId?:string):Promise<string>{
        return new Promise((resolve, reject) => {
            let keyId = (arnKeyId) ? arnKeyId : this.getARNDefault();

            this.kms.encrypt({ KeyId:keyId, Plaintext:plainText }, (error, data) => {
                if (error) {
                    return reject(error.stack);
                }
                else {
                    return resolve(data.CiphertextBlob?.toString('base64'));
                }
              });
        })
    }

    async decrypt(cipherText:string, arnKeyId?:string):Promise<string>{
        return new Promise((resolve, reject) =>{
            let keyId = (arnKeyId) ? arnKeyId : this.getARNDefault();
            this.kms.decrypt({ KeyId:keyId, CiphertextBlob:new Buffer(cipherText, 'base64') }, (error, data) => {
                if (error) {
                    return reject(error.stack);
                }
                else {
                    return resolve(data.Plaintext?.toString('ascii'))
                }
            });
        });
    }
}