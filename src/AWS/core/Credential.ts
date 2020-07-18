
import { MapEnv } from "map-env-node";
import { IAWSCredential } from "../interfaces/IAWSCredential";

export class Credential{
    static getOptions():IAWSCredential {
        return MapEnv.get<IAWSCredential>("AWS_CREDENTIAL");
    }
}