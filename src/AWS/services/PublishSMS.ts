import { SNS, AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { Credential } from "../core/Credential";

export class PublishSMS {
	private sns: SNS;

	constructor() {
		const { accessKeyId, secretAccessKey, region } = Credential.getOptions();
		this.sns = new SNS({
			accessKeyId,
			secretAccessKey,
			region
		});
	}

	async publish(to: string, body: string): Promise<PromiseResult<SNS.PublishResponse, AWSError>> {
		await this.sns.setSMSAttributes({
			attributes: {
				DefaultSMSType: 'Transactional'
			}
		}).promise();

		return await this.sns.publish({
			PhoneNumber: to,
			Message: body,
			MessageStructure: 'string'
		}).promise();
	}
}