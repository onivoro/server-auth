import { Injectable } from "@nestjs/common";
import { LoginWithEmailAndPasswordDto } from "../dtos/login-with-email-and-password.dto";
import { LoginWithApiCredentialsDto } from "../dtos/login-with-api-credentials.dto";

@Injectable()
export class TokenBuilder<TAccessToken> {
    async byEmailAndPassword(creds: LoginWithEmailAndPasswordDto): Promise<TAccessToken> {
        return {} as TAccessToken;
    }
    async byApiCredentials(creds: LoginWithApiCredentialsDto): Promise<TAccessToken> {
        return {} as TAccessToken;
    }
}