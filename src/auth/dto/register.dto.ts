import { Transform, Type } from "class-transformer";
import { IsEmail, IsInt, IsNumber, IsNumberString, IsString, IsUppercase, MaxLength, MinLength, Validate, ValidationArguments } from "class-validator";

function IsValidDv(value: string, args: ValidationArguments) {
    // Verificar si es un número o una letra
    if (/^[0-9K]$/i.test(value)) {
        return true;
    }
    return false;
}


export class RegisterDto {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    lastName: string;

    @Transform(({ value }) => value.trim())
    @MinLength(6)
    rut: string;

    @Transform(({ value }) => value.trim())
    @Validate(IsValidDv)
    dv: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    rutEmpresa?: string;

    @Type(() => Number)
    client_id: number;



}