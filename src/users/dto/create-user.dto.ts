
import { IsEmail, IsNumberString, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';


function IsValidDv(value: string, args: ValidationArguments) {
    // Verificar si es un número o una letra
    if (/^[0-9kK]$/i.test(value)) {
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

    @IsString()
    @MaxLength(1)
    @Validate(IsValidDv)
    dv: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;


}
