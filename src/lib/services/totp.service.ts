import { Injectable } from '@nestjs/common';
import * as OTPAuth from 'otpauth';
import * as qrcode from 'qrcode';
import { TotpGenerationDto } from '../dtos/totp-generation.dto';
import { TotpVerificationDto } from '../dtos/totp-verification.dto';

@Injectable()
export class TotpService {
    constructor(private period = 30, private digits = 6, private algorithm = 'SHA1', private window = 2) { }

    async generateSecret(issuer: string, label: string): Promise<TotpGenerationDto> {
        const secret = new OTPAuth.Secret({ size: 20 });

        const totp = new OTPAuth.TOTP({
            issuer,
            label,
            algorithm: this.algorithm,
            digits: this.digits,
            period: this.period,
            secret
        });

        // otpauth://totp/ACME:AzureDiamond?issuer=ACME&secret=NB2W45DFOIZA&algorithm=SHA1&digits=6&period=30
        const url = totp.toString();

        return { url, secret: secret.base32, qr: await this.generateQrCode(url) };
    }

    verifyToken(params: TotpVerificationDto): number | null {
        const { secret, token } = (params || {});
        const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromBase32(secret),
            algorithm: this.algorithm,
            digits: this.digits,
            period: this.period,
        });

        return totp.validate({ token, window: this.window });
    }

    private async generateQrCode(otpAuthUrl: string) {
        return await qrcode.toDataURL(otpAuthUrl);
    }
}