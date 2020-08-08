import { KMSLight } from '../../src/AWS/services/KMSLight';

import dotenv from "dotenv";
dotenv.config();

describe('KMSLight', () => {
    it('should encrypt and decript correct', async () => {
        const plainText = "hello word";
        const kms = new KMSLight();
        const encrypt = await kms.encrypt(plainText);
        const decrypt = await kms.decrypt(encrypt);
        expect(decrypt === plainText).toBe(true);
    })
})