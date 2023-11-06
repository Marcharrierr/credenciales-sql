import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { StringifyOptions } from 'querystring';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register({ name, lastName, rut, dv, email, password }: RegisterDto) {
        const userByEmail = await this.usersService.findByEmail(email);
        const userByRut = await this.usersService.findByEmail(rut);

        if (userByEmail || userByRut) {
            throw new BadRequestException('Usuario ya existe');
        }
        await this.usersService.create(
            {
                name, lastName, rut, dv, email,
                password: await bcryptjs.hash(password, 10)
            });
        return { name, email };
    }



    async login({ email, password }: LoginDto) {

        const user = await this.usersService.findByEmailPass(email)

        if (!user) {
            throw new UnauthorizedException('Acceso denegado');
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Acceso denegado');
        }
        const payload = {
            email: user.email,
            // role: user.role 
        };

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            email,
        };
    }

    // async updatePassByEmail({ email, password }: UpdateUserDto,) {
    //     const userEmail = await this.usersService.findByEmail(email);

    //     if (!userEmail) {
    //         throw new BadRequestException('Correo no existe o correo ingresado no es válido');
    //     }
    //     const hashedNewPassword = await bcryptjs.hash(password, 10);

    //     return this.usersService.updatePassByEmail(email, hashedNewPassword);


    // }

    async propiedadesProfile({ email, role }: { email: string; role: string; }) {
        return await this.usersService.findByEmail(email);
    }


    getJwtToken(payload) {

        const token = this.jwtService.sign(payload)
        return token;

    }





}
