import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';

// import { Request } from 'express'

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { Auth } from './decorators/auth.decorators';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserInterfaceActive } from '../common/interfaces/user-active.interface';
import { User } from 'src/users/entities/user.entity';



@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }


    @Post('login')
    login(
        @Body() loginDto: LoginDto,
    ) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(Role.USER)
    profile(@ActiveUser() user: UserInterfaceActive) {
        return this.authService.propiedadesProfile(user)
    }

    @Post('register')
    register(
        @Body() registerDto: RegisterDto,
    ) {
        return this.authService.register(registerDto);
    }


    @Get('check-token')
    checkToken(
        @Request() req: Request) {

        const user = req['user'] as User;
        console.log(req)

        return {
            user
        }
    }



}
