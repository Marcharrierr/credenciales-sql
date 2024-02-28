import { Property } from './entities/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { PropertysService } from './propertys.service';
import { PropertysController } from './propertys.controller';
import { PropertyService } from '../property-service/entities/property-service.entity';
import { PropertyServiceService } from '../property-service/property-service.service';


@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyService])],
  providers: [PropertysService],
  controllers: [PropertysController],
})
export class PropertysModule { }
