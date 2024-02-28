import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { EmailValidationService } from './email-validation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    TypeOrmModule.forFeature([Agent]),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.resend.com',
          port: 465,
          secure: true, // true para 465, false para otros ports
          auth: {
            user: 'resend',
            pass: 're_CMTfAqvU_5Ybv5dYtRoVqjJvWHQGQi1Xh'
          },
        },
        defaults: {
          from: "onboarding@resend.dev",
        },
        template: {
          dir: join(__dirname, '..', '..', 'src', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService, EmailValidationService,],
  exports: [MailService, EmailValidationService,],
})
export class MailModule {}


