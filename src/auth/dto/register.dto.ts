import { Transform } from "class-transformer";
import { IsEmail, IsNumberString, IsString, MaxLength, MinLength, Validate, ValidationArguments } from "class-validator";

function IsValidDv(value: string, args: ValidationArguments) {
    // Verificar si es un número o una letra
    if (/^[0-9kK]$/i.test(value)) {
        return false;
    }
    return true;
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
    @IsNumberString()
    @MinLength(6)
    rut: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MaxLength(1)
    @Validate(IsValidDv)
    dv: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;


}