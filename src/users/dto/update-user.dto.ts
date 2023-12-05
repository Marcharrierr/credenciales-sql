import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {


    @IsString()
    @MinLength(3)
    name?: string;

    @IsString()
    @MinLength(3)
    lastName?: string;

    @IsEmail()
    email?: string;

    @MinLength(6)
    password?: string;


}
