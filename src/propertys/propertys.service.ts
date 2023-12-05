import { Property } from './entities/property.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PropertysService {

  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>
  ) { }


  async create(createPropertyDto: CreatePropertyDto) {
    return 'This action adds a new property';
  }

  async getPropertiesByClientId(clientId: number): Promise<Property[]> {
    return this.propertyRepository.find({ where: { client_id: clientId } });
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
    return `This action removes a #${id} property`;
  }
}
