import { Module } from '@nestjs/common';

import { moduleFactory, ServerCommonModule } from '@onivoro/server-common';

import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { TokenValidationService } from './services/token-validation.service';
import { ServerAuthConfig } from './classes/server-auth-config.class';
import { TokenBuilder } from './classes/token-builder.class';

const controllers = [
  LoginController,
];

const imports = [
  ServerCommonModule,
];

const providers = [
  TokenBuilder,
];

@Module({
  providers,
  imports
})
export class ServerAuthModule {
  static configure<TAccessToken>(
    config: ServerAuthConfig,
  ) {
    return moduleFactory({
      module: ServerAuthModule,
      controllers,
      imports,
      providers: [
        ...providers,
        LoginService,
        TokenValidationService,
        {
          provide: ServerAuthConfig,
          useValue: config
        },
      ],
    })
  }
}
