import { Injectable } from "@nestjs/common";
import { LoginWithEmailAndPasswordDto } from "../dtos/login-with-email-and-password.dto";
import { LoginWithApiCredentialsDto } from "../dtos/login-with-api-credentials.dto";
import jwt from 'jsonwebtoken';

@Injectable()
export class TokenBuilder<TAccessToken> {
    async byEmailAndPassword(creds: LoginWithEmailAndPasswordDto): Promise<TAccessToken> {
        return {} as TAccessToken;
    }
    async byApiCredentials(creds: LoginWithApiCredentialsDto): Promise<TAccessToken> {
        return {} as TAccessToken;
    }

    static sign(_: { jwtSecret: string, expiresIn: string }, payload: any) {
        const { jwtSecret, expiresIn } = _;
        return jwt.sign(payload, jwtSecret, { expiresIn });
    }
}