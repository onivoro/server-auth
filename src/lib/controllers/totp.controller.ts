import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { SuccessDto, ValueDto } from '@onivoro/server-common';
import { TotpService } from '../services/totp.service';
import { ServerAuthConfig } from '../classes/server-auth-config.class';
import { TotpGenerationDto } from '../dtos/totp-generation.dto';
import { TotpVerificationDto } from '../dtos/totp-verification.dto';

@Controller('totp')
export class TotpController {
   constructor(private totpSvc: TotpService, private config: ServerAuthConfig) { }

   @Post('generate')
   @ApiBody({ type: ValueDto })
   @ApiResponse({ type: ValueDto })
   async generate(@Body() body: ValueDto): Promise<TotpGenerationDto> {
      if (!body?.value) {
         throw new BadRequestException('Missing "label" for token generation')
      }
      return await this.totpSvc.generateSecret(this.config.issuer, body.value);
   }

   @Post('verify')
   @ApiBody({ type: TotpVerificationDto })
   @ApiResponse({ type: SuccessDto })
   verify(@Body() body: TotpVerificationDto): SuccessDto {
      return { success: this.totpSvc.verifyToken(body) !== null };
   }
}