import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServicePropertyDto } from './dto/create-service-property.dto';
import { UpdateServicePropertyDto } from './dto/update-service-property.dto';
import { ServiceProperty } from './entities/service-property.entity';

@Injectable()
export class ServicePropertysService {
  constructor(
    @InjectRepository(ServiceProperty)
    private servicePropertyRepository: Repository<ServiceProperty>,
  ) { }


  create(createServicePropertyDto: CreateServicePropertyDto) {
    return 'This action adds a new serviceProperty';
  }


  async findAll() {
    const categories = ['luz', 'agua', 'gas', 'ggcc', 'aseo', 'contribuciones'];
    const data = {};

    for (const category of categories) {
      data[category] = await this.servicePropertyRepository.find({
        where: { category },
        order: { category: 'ASC' },
      });
    }

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceProperty`;
  }

  update(id: number, updateServicePropertyDto: UpdateServicePropertyDto) {
    return `This action updates a #${id} serviceProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceProperty`;
  }
}
