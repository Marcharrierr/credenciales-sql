import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicePropertysService } from './service-propertys.service';
import { CreateServicePropertyDto } from './dto/create-service-property.dto';
import { UpdateServicePropertyDto } from './dto/update-service-property.dto';

@Controller('service-propertys')
export class ServicePropertysController {
  constructor(private readonly servicePropertysService: ServicePropertysService) { }

  @Post()
  create(@Body() createServicePropertyDto: CreateServicePropertyDto) {
    return this.servicePropertysService.create(createServicePropertyDto);
  }

  @Get()
  findAll() {
    return this.servicePropertysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicePropertysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicePropertyDto: UpdateServicePropertyDto) {
    return this.servicePropertysService.update(+id, updateServicePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicePropertysService.remove(+id);
  }
}
