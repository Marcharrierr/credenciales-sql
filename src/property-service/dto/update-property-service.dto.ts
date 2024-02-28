import { PartialType } from '@nestjs/swagger';
import { CreatePropertyServiceDto } from './create-property-service.dto';

export class UpdatePropertyServiceDto extends PartialType(CreatePropertyServiceDto) {}
