import { SNS, AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { Credential } from "../core/Credential";

export class SNSLight{
    private sns:SNS;

    constructor(){
        const {accessKeyId, secretAccessKey, region} = Credential.getOptions();
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
}