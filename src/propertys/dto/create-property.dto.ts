import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePropertyDto {

    @IsNotEmpty()
    @IsNumber()
    community_rut: number;

    @IsNotEmpty()
    @IsString()
    community_dv: string;

    @IsNotEmpty()
    @IsString()
    community_name: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    region: string;

    @IsNotEmpty()
    @IsString()
    municipality: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsString()
    tower?: string;

    @IsNotEmpty()
    @IsString()
    department: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    client_id: number;


}
