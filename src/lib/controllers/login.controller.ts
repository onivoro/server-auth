import { Body, Controller, Post } from '@nestjs/common';
import { LoginWithEmailAndPasswordDto } from '../dtos/login-with-email-and-password.dto';
import { LoginWithApiCredentialsDto } from '../dtos/login-with-api-credentials.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginService } from '../services/login.service';
import { ValueDto } from '@onivoro/server-common';

@Controller('login')
export class LoginController<TAccessToken> {
    constructor(private loginSvc: LoginService<TAccessToken>) {}

    @Post('password')
    @ApiBody({ type: LoginWithEmailAndPasswordDto })
    @ApiResponse({ type: ValueDto })
    async postPassword(@Body() body: LoginWithEmailAndPasswordDto): Promise<ValueDto> {
       return { value: await this.loginSvc.loginWithEmailAndPassword(body) };
    }

    @Post('key')
    @ApiBody({ type: LoginWithApiCredentialsDto })
    @ApiResponse({ type: ValueDto })
    async postKey(@Body() body: LoginWithApiCredentialsDto): Promise<ValueDto> {
       return { value: await this.loginSvc.loginWithApiCredentials(body) };
    }
}