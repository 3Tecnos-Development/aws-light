import { KMSLight } from "AWS/services/KMSLight";
import { SNSLight } from "AWS/services/SNSLight";

export class AWSLight {
    KMS:KMSLight;
    SNS:SNSLight;
    constructor(){
        this.KMS = new KMSLight();
        this.SNS = new SNSLight();
    }
}