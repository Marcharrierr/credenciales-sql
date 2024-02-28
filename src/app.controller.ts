import { Body, Controller, Get, Options, Param, Patch, Post, Query, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { EmailValidationService } from './mail/email-validation.service';
import { MailGuard } from './mail/guard/mail.guard';
import { jwtConstants } from './mail/constants/jwt.constant';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
    constructor(
        private readonly mailService: MailService,
        private readonly emailValidationService: EmailValidationService,
        private readonly jwtService: JwtService) { }

    @Get('/recover-password')
    @UseGuards(MailGuard)
    recoverPassword(@Request() req) {
        return req.user;
    }

    @Post('/send-email')
    async sendMail(@Body() body: { to: string }): Promise<{ success: boolean, message?: string }> {
        try {
            //verificar si el agent existe
            const agentExists = await this.emailValidationService.agentExistByEmail(body.to)
            if (!agentExists) {
                return { success: false, message: 'Ingrese un email válido' }
            }
            await this.mailService.sendMail(body.to);
            return { success: true, message: 'Email sent successfully!' };
        } catch (error) {
            return { success: false, message: 'Failed to send email.' };
        }
    }

    @Post('/verify-token')
    async verifyToken(@Body() body: { token: string }): Promise<{ success: boolean }> {
        try {
            const decodedToken = await this.jwtService.verifyAsync(body.token, {
                secret: jwtConstants.secret,
            });

            return { success: true };
        } catch (error) {
            return { success: false };
        }
    }

}
