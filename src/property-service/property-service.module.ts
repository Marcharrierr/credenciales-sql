import { Module } from '@nestjs/common';
import { PropertyServiceService } from './property-service.service';
import { PropertyServiceController } from './property-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyService } from './entities/property-service.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PropertyService]),],
  controllers: [PropertyServiceController],
  providers: [PropertyServiceService],
})
export class PropertyServiceModule { }
