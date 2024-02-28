import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyServiceDto } from './dto/create-property-service.dto';
import { UpdatePropertyServiceDto } from './dto/update-property-service.dto';
import { PropertyService } from './entities/property-service.entity';

@Injectable()
export class PropertyServiceService {
  constructor(
    @InjectRepository(PropertyService)
    private propertyServiceRepository: Repository<PropertyService>,
  ) { }



  create(createPropertyServiceDto: CreatePropertyServiceDto) {
    return 'This action adds a new propertyService';
  }

  findAll() {
    return `This action returns all propertyService`;
  }

  findOne(id: number) {
    return this.propertyServiceRepository.findOne({ where: { property_id: id } });
  }

  findByPropertyId(id: number) {
    return this.propertyServiceRepository.find({ where: { property_id: id } });
  }


  update(id: number, updatePropertyServiceDto: UpdatePropertyServiceDto) {
    return `This action updates a #${id} propertyService`;
  }

  async removeByPropertyId(propertyId: number) {
    const services = await this.propertyServiceRepository.find({ where: { property_id: propertyId } });
    if (!services || services.length === 0) {
      throw new NotFoundException(`No hay servicios para la propiedad ${propertyId}`);
    }
    await this.propertyServiceRepository.remove(services);
    return 'Servicios eliminados con éxito';
  }







}