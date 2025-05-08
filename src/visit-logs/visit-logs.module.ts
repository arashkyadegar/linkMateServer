import { Module } from '@nestjs/common';
import { VisitLogsService } from './visit-logs.service';
import { VisitLogsController } from './visit-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitLogEntity } from './entities/visit-log.entity';
import { GeoLocationService } from './get-location.service';

@Module({
  imports: [TypeOrmModule.forFeature([VisitLogEntity])],
  controllers: [VisitLogsController],
  providers: [VisitLogsService, GeoLocationService],
  exports: [VisitLogsService, TypeOrmModule,]
})
export class VisitLogsModule { }
