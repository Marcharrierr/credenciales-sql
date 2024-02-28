import { PartialType } from '@nestjs/swagger';
import { CreateServicePropertyDto } from './create-service-property.dto';

export class UpdateServicePropertyDto extends PartialType(CreateServicePropertyDto) {}
