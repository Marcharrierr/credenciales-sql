import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { PropertysService } from './propertys.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyServiceDto } from '../property-service/dto/create-property-service.dto'; // Asegúrate de importar el DTO correcto



export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.toUpperCase();
    } else if (typeof value === 'object' && value !== null) {
      for (let key in value) {
        if (typeof value[key] === 'string') {
          value[key] = value[key].toUpperCase();
        }
      }
    }
    return value;
  }
}


@Controller('propertys')
export class PropertysController {
  constructor(private readonly propertysService: PropertysService) { }


  @Post()
  @UsePipes(new UppercasePipe())
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertysService.create(createPropertyDto);
  }

  @Post(':id/services')
  @UsePipes(new UppercasePipe())
  createService(@Param('id') id: number, @Body() createPropertyServicesDto: CreatePropertyServiceDto[]) {

    return this.propertysService.createServices(id, createPropertyServicesDto);
  }


  @Get(':client_id')
  getPropertiesByClientId(@Param('client_id') clientId: number) {
    return this.propertysService.getPropertiesByClientId(clientId);
  }
  @Get('id/:id')
  getPropertiesById(@Param('id') id: number) {
    return this.propertysService.getPropertiesById(id);
  }

  @Get()
  findAll() {
    return this.propertysService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertysService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  async removeProperty(@Param('id') id: string) {
    await this.propertysService.remove(+id);
  }

}
