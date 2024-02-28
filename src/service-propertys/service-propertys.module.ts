import { Module } from '@nestjs/common';
import { ServicePropertysService } from './service-propertys.service';
import { ServicePropertysController } from './service-propertys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceProperty } from './entities/service-property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceProperty])],
  controllers: [ServicePropertysController],
  providers: [ServicePropertysService],
})
export class ServicePropertysModule { }
