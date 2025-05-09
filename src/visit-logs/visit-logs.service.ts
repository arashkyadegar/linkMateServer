import { Injectable } from '@nestjs/common';
import { CreateVisitLogDto } from './dto/create-visit-log.dto';
import { UpdateVisitLogDto } from './dto/update-visit-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitLogEntity } from './entities/visit-log.entity';
import { MongoRepository } from 'typeorm';
import { GeoLocationService } from './get-location.service';
import { ObjectId } from 'mongodb';
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';

@Injectable()
export class VisitLogsService {
  constructor(
    @InjectRepository(VisitLogEntity)
    private visitLogRepository: MongoRepository<VisitLogEntity>,
    private readonly getLocationService: GeoLocationService
  ) { }

  async create(targetLink: ObjectId, targetIp: string) {
    const geoResult = await this.getLocationService.getGeoInfo(targetIp);

    let { linkType,
      ip,
      country,
      city,
      region,
      latitude,
      longitude,
      userAgent } =
      geoResult;

    const objectLinkId = targetLink ? new ObjectId(targetLink) : null;

    const visiLog = this.visitLogRepository.create({
      linkType,
      ...(objectLinkId && { linkId: objectLinkId }),
      city,
      ip: ip,
      country: country,
      region,
      latitude,
      longitude,
      userAgent,
      createdAt: Date.now(),
    });

    return this.visitLogRepository.save(visiLog);
  }


  async findAllByLinkId(
    linkId: string): Promise<any> {
    const visitLogs = this.visitLogRepository.aggregate([
      { $match: { linkId: new ObjectId(linkId) } },
      { $sort: { createdAt: -1 } } // Sort by latest visits first
    ]).toArray();
    return visitLogs;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitLog`;
  }

  update(id: number, updateVisitLogDto: UpdateVisitLogDto) {
    return `This action updates a #${id} visitLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitLog`;
  }
}
