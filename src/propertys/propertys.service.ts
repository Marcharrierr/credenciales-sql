import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { PropertyService } from '../property-service/entities/property-service.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { CreatePropertyServiceDto } from '../property-service/dto/create-property-service.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyServiceService } from '../property-service/property-service.service';

@Injectable()
export class PropertysService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(PropertyService)
    private readonly propertyServiceRepository: Repository<PropertyService>,

  ) { }

  async create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertyRepository.create({
      ...createPropertyDto,
      last_process_status: 'NO-PROCESADO',
      last_process_date: '2000-01-01',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      status: 'ACTIVO',
    });
    const savedProperty = await this.propertyRepository.save(property);
    return savedProperty.id;
  }

  async createServices(id: number, createPropertyServicesDto: CreatePropertyServiceDto[]) {
    const property = await this.propertyRepository.findOne({ where: { id: id } });
    if (!property) {
      throw new NotFoundException(`La propiedad ${id} no existe`);
    }

    const services = createPropertyServicesDto.map(service => ({
      ...service,
      property_id: property.id,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    }));

    await this.propertyServiceRepository.save(services);
    return services;
  }





  async getPropertiesByClientId(clientId: number): Promise<Property[]> {
    return this.propertyRepository.find({ where: { client_id: clientId } });
  }

  async getPropertiesById(id: number): Promise<Property[]> {
    return this.propertyRepository.find({ where: { id: id } });
  }


  async findAll() {
    return await this.propertyRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  async remove(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id: id } });
    if (!property) {
      throw new NotFoundException(`La propiedad ${id} no existe`);
    }
    await this.propertyRepository.remove(property);
    return 'Propiedad eliminada con éxito';
  }



}

