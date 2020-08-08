import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

describe('File .env', () =>{
    it('should .env file exists', () => {
        const filePath = './.env';
        expect(fs.existsSync(filePath)).toBe(true);
    })

    it('should AWS_CREDENTIAL variable exists in .env file', () => {
        const nodeEnvIsNotNull = !!process.env.AWS_CREDENTIAL;
        expect(nodeEnvIsNotNull).toBe(true);
    })

    it('should the variable AWS_CREDENTIAL is in valid JSON format', () => {
        const json = JSON.parse(process.env.AWS_CREDENTIAL!);
        const hasProperties = json.hasOwnProperty('accessKeyId') && json.hasOwnProperty('secretAccessKey')

        expect(hasProperties).toBe(true);
    })
})

