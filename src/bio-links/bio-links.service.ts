import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBioLinkDto } from './create-biolink.dto';
import { BioLinkEntity } from './biolink.entity';
import { Repository } from 'typeorm';
import { MapsService } from 'src/maps/maps.service';

@Injectable()
export class BioLinksService {
  constructor(
    @InjectRepository(BioLinkEntity)
    private bioLinkRepository: Repository<BioLinkEntity>,
    private readonly mapsService: MapsService, // Inject MapService
  ) {}

  async createBioLink(
    createBioLinkDto: CreateBioLinkDto,
  ): Promise<BioLinkEntity> {
    const { name, userId, link, video, title, desc, maps } = createBioLinkDto;
    let map;

    if (maps) {
      map = await this.mapsService.createMap(maps);
    }

    const bioLink = this.bioLinkRepository.create({
      name,
      userId,
      link,
      video,
      title,
      desc,
      map,
    });

    return this.bioLinkRepository.save(bioLink);
  }

  async findAllBioLink(): Promise<BioLinkEntity[]> {
    const bioLinks = this.bioLinkRepository.find({ relations: ['map'] });

    return bioLinks;
  }
}
