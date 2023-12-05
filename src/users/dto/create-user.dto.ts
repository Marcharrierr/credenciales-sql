
import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsNumberString, IsString, IsUppercase, MaxLength, MinLength, Validate } from "class-validator";
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';


function IsValidDv(value: string, args: ValidationArguments) {
    // Verificar si es un número o una letra
    if (/^[0-9K]$/i.test(value)) {
        return false;
    }
    return true;
}


export class CreateUserDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    lastName: string;

    @IsNumberString()
    @MinLength(6)
    rut: string;

    @Transform(({ value }) => value.trim())
    @Validate(IsValidDv)
    dv: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsNumber()
    client_id: number;

    @IsNumberString()
    @MinLength(6)
    rutEmpresa?: string;

}
