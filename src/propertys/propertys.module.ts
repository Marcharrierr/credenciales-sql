import { Property } from './entities/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PropertysService } from './propertys.service';
import { PropertysController } from './propertys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertysController],
  providers: [PropertysService],
})
export class PropertysModule { }
