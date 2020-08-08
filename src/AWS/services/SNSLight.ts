import AWS, { SNS, AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { Credential } from "../core/Credential";

export class SNSLight{
		private sns:SNS;
		private accessKeyId: string;
		private secretAccessKey: string;

    constructor(){
				const {accessKeyId, secretAccessKey, region} = Credential.getOptions();
				this.accessKeyId = accessKeyId;
				this.secretAccessKey = secretAccessKey;

        this.sns = new SNS({
            accessKeyId,
            secretAccessKey,
            region
        });
    }

    async publish(message:string, topicArn:string): Promise<PromiseResult<SNS.PublishResponse, AWSError>>{
        return await this.sns.publish({
            Message:message,
            TopicArn:topicArn
        }).promise();
	}		

	async publishSMS(phoneNumber: string, message: string, region: string = 'us-west-2'): Promise<PromiseResult<SNS.PublishResponse, AWSError>> {

		const snsSMS = new SNS({ 
			accessKeyId: this.accessKeyId, 
			secretAccessKey: this.secretAccessKey, 
			region: region 
		});
		
		await snsSMS.setSMSAttributes({
			attributes: {
				DefaultSMSType: 'Transactional'
			}
		}).promise();

		return await snsSMS.publish({
			PhoneNumber: phoneNumber,
			Message: message,
			MessageStructure: 'string'
		}).promise();
	}
}