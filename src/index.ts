import { KMSLight } from "./AWS/services/KMSLight";
import { SNSLight } from "./AWS/services/SNSLight";
import { S3Light } from "./AWS/services/S3Light";

export * from "./AWS/core/Credential";
export * from "./AWS/services/KMSLight";
export * from "./AWS/services/SNSLight";
export * from "./AWS/services/S3Light";

export class AWSLight {
	KMS:KMSLight;
	SNS:SNSLight;
	S3:S3Light;
	
	constructor(){
		this.KMS = new KMSLight();
		this.SNS = new SNSLight();
		this.S3 = new S3Light();
	}
}