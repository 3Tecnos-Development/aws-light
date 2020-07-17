import { IAWSCredential } from "AWS/interfaces/IAWSCredential";
import { MapEnv } from "map-env-node";

export class Credential{
    static getOptions():IAWSCredential {
        return MapEnv.get<IAWSCredential>("AWS_CREDENTIAL");
    }
}