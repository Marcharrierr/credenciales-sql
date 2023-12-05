import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { StringifyOptions } from 'querystring';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource,
    ) { }


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
            id: user.id

            // role: user.role 
        };

        const token = await this.jwtService.signAsync(payload)


        return {
            token,
            id: user.id

        };
    }


    getJwtToken(payload) {
        const token = this.jwtService.sign(payload)
        return token;
    }




}
