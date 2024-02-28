import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Resend } from 'resend';
import { EmailValidationService } from './email-validation.service';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt'
import { agent } from 'supertest';


@Injectable()
export class MailService {
    private readonly resetPasswordLink: string = 'http://localhost:3000/auth/recover-password';

    constructor(
        private readonly mailerService: MailerService,
        private readonly emailValidation: EmailValidationService,
        private readonly jwtService: JwtService
    ) { }

    async sendMail(to: string): Promise<void> {
        // Verificar si el agente existe antes de enviar el correo
        try {
            const agentExists = await this.emailValidation.agentExistByEmail(to)
            if (!agentExists) {
                throw new NotFoundException('Ingrese un email válido');
            }

            const resetToken = await this.generateResetToken(to);
            const resetLink = `${this.resetPasswordLink}?token=${resetToken}`;

            await this.mailerService.sendMail({
                to: to,
                subject: 'Recuperación de contraseña',
                template: 'welcome',
                context: {
                    resetPasswordLink: resetLink,
                },
            });
            console.log('Email sent successfully.');
            console.log(resetToken);

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('Agente no encontrado');
            } else {
                console.error('Error sendindg email:', error)
                throw new Error('Error sending email');
            }
        }
    }

    private async generateResetToken(email: string): Promise<string> { // El método tiene que ser privado
        // Verificar si el userId existe en la bd
        const agentExists = await this.emailValidation.agentExistByEmail(email);

        if (!agentExists) {
            throw new NotFoundException('Usuario no encontrado');
        }
        try {
            const token = await this.jwtService.signAsync({ email }, { expiresIn: '1h' })
            return token;
        } catch (error) {
            console.error('Error al generar el token:', error);
            throw new Error('Error al generar el token');
        }
    }



}

