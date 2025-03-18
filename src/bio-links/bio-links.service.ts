import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBioLinkDto, UpdateBioLinkDto } from './create-biolink.dto';
import { BioLinkEntity } from './biolink.entity';
import { Repository } from 'typeorm';
import { MapsService } from '../maps/maps.service';

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
    const {
      name,
      userId,
      link,
      video,
      title,
      desc,
      maps,
      links,
      superLinks,
      slider,
    } = createBioLinkDto;
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
      links,
      superLinks,
      slider,
    });

    return this.bioLinkRepository.save(bioLink);
  }

  async findAllBioLink(): Promise<BioLinkEntity[]> {
    const bioLinks = this.bioLinkRepository.find({ relations: ['map'] });

    return bioLinks;
  }

  async updateBioLink(
    id: number, // or your identifier type
    updateBioLinkDto: UpdateBioLinkDto,
  ): Promise<BioLinkEntity> {
    const {
      name,
      userId,
      link,
      video,
      title,
      desc,
      maps,
      links,
      superLinks,
      slider,
    } = updateBioLinkDto;

    const bioLink = await this.bioLinkRepository.findOne({ where: { id } });
    if (!bioLink) {
      throw new NotFoundException(`BioLink with ID ${id} not found`);
    }

    let updatedMap;

    // if (maps) {
    //   updatedMap = await this.mapsService.updateMap(bioLink.map.id, maps);
    // }

    Object.assign(bioLink, {
      name,
      userId,
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

  async deleteBioLink(id: number): Promise<void> {
    const bioLink = await this.bioLinkRepository.findOne({ where: { id } });

    if (!bioLink) {
      throw new NotFoundException(`BioLink with ID ${id} not found`);
    }

    await this.bioLinkRepository.remove(bioLink);
  }
}
