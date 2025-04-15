import { Injectable } from '@nestjs/common';
import { CreateTimeLinkDto } from './dto/create-time-link.dto';
import { UpdateTimeLinkDto } from './dto/update-time-link.dto';

@Injectable()
export class TimeLinksService {
  create(createTimeLinkDto: CreateTimeLinkDto) {
    return 'This action adds a new timeLink';
  }

  findAll() {
    return `This action returns all timeLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeLink`;
  }

  update(id: number, updateTimeLinkDto: UpdateTimeLinkDto) {
    return `This action updates a #${id} timeLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeLink`;
  }
}
