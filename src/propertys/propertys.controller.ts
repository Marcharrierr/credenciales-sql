import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertysService } from './propertys.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('propertys')
export class PropertysController {
  constructor(private readonly propertysService: PropertysService) { }

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertysService.create(createPropertyDto);
  }

  @Get(':client_id')
  getPropertiesByClientId(@Param('client_id') clientId: number) {
    return this.propertysService.getPropertiesByClientId(clientId);
  }

  @Get()
  findAll() {
    return this.propertysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertysService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertysService.remove(+id);
  }
}
