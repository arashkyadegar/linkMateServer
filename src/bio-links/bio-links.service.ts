import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBioLinkDto, UpdateBioLinkDto } from './create-biolink.dto';
import { BioLinkEntity } from './biolink.entity';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';
import { createPaginatedResult } from 'src/common/helpers/createPaginatedResult';
// import { MapsService } from '../maps/maps.service';

@Injectable()
export class BioLinksService {
  constructor(
    @InjectRepository(BioLinkEntity)
    private bioLinkRepository: MongoRepository<BioLinkEntity>,
    // private readonly mapsService: MapsService, // Inject MapService
  ) {}

  async createBioLink(
    createBioLinkDto: CreateBioLinkDto,
  ): Promise<BioLinkEntity> {
    let {
      name,
      userId,
      link,
      video,
      title,
      desc,
      map,
      links,
      superLinks,
      slider,
    } = createBioLinkDto;

    const bioLink = this.bioLinkRepository.create({
      name,
      userId: new ObjectId(userId),
      link,
      video,
      title,
      desc,
      map,
      links,
      superLinks,
      slider,
    });

    return this.bioLinkRepository.save(bioLink);
  }

  async findAllBioLink(
    page: number,
    pageSize: number,
    userId: string,
  ): Promise<PaginatedResult<any>> {
    const skipNumber = (page - 1) * pageSize;

    const pipeline = [
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: 'views',
          localField: '_id',
          foreignField: 'bioLinkId',
          as: 'views',
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skipNumber },
      { $limit: pageSize },
    ];

    const [result, totalCount] = await Promise.all([
      this.bioLinkRepository.aggregate(pipeline).toArray(),
      this.bioLinkRepository.count({ where: { userId: new ObjectId(userId) } }),
    ]);

    return createPaginatedResult(result, totalCount);
  }

  async updateBioLink(
    id: string, // or your identifier type
    updateBioLinkDto: UpdateBioLinkDto,
  ): Promise<BioLinkEntity> {
    const {
      name,
      userId,
      link,
      video,
      title,
      desc,
      map,
      links,
      superLinks,
      slider,
    } = updateBioLinkDto;

    const bioLink = await this.bioLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!bioLink) {
      throw new NotFoundException(`BioLink with ID ${id} not found`);
    }

    let updatedMap;

    // if (maps) {
    //   updatedMap = await this.mapsService.updateMap(bioLink.map.id, maps);
    // }

    Object.assign(bioLink, {
      name,
      // userId,
      link,
      video,
      title,
      desc,
      map: updatedMap || bioLink.map,
      links,
      superLinks,
      slider,
    });

    return this.bioLinkRepository.save(bioLink);
  }

  async findOneBioLink(id: string, userId: string): Promise<BioLinkEntity> {
    const bioLink = await this.bioLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!bioLink) {
      throw new NotFoundException(`BioLink with ID ${id} not found`);
    }

    return bioLink;
  }

  async deleteBioLink(id: string, userId: string): Promise<void> {
    const bioLink = await this.bioLinkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    if (!bioLink) {
      throw new NotFoundException(`BioLink with ID ${id} not found`);
    }

    await this.bioLinkRepository.remove(bioLink);
  }
}
