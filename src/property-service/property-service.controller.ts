import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyServiceService } from './property-service.service';
import { CreatePropertyServiceDto } from './dto/create-property-service.dto';
import { UpdatePropertyServiceDto } from './dto/update-property-service.dto';

@Controller('property-service')
export class PropertyServiceController {
  constructor(private readonly propertyServiceService: PropertyServiceService) { }

  @Post()
  create(@Body() createPropertyServiceDto: CreatePropertyServiceDto) {
    return this.propertyServiceService.create(createPropertyServiceDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.propertyServiceService.findOne(+id);
  // }

  @Get(':id')
  findByPropertyId(@Param('id') id: string) {
    return this.propertyServiceService.findByPropertyId(+id);
  }


  @Get()
  findAll() {
    return this.propertyServiceService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyServiceDto: UpdatePropertyServiceDto) {
    return this.propertyServiceService.update(+id, updatePropertyServiceDto);
  }

  @Delete(':id')
  async removeServicesByPropertyId(@Param('id') id: string) {
    await this.propertyServiceService.removeByPropertyId(+id);
  }

}
