import { PartialType } from '@nestjs/swagger';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {


    community_rut?: number;

    community_dv?: string;

    community_name?: string;

    type?: string;

    region?: string;

    municipality?: string;

    address?: string;

    tower?: string;

    department?: string;


}
