import { Injectable } from '@nestjs/common';
import { CreateOneTimeLinkDto } from './dto/create-one-time-link.dto';
import { UpdateOneTimeLinkDto } from './dto/update-one-time-link.dto';

@Injectable()
export class OneTimeLinksService {
  create(createOneTimeLinkDto: CreateOneTimeLinkDto) {
    return 'This action adds a new oneTimeLink';
  }

  findAll() {
    return `This action returns all oneTimeLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oneTimeLink`;
  }

  update(id: number, updateOneTimeLinkDto: UpdateOneTimeLinkDto) {
    return `This action updates a #${id} oneTimeLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} oneTimeLink`;
  }
}
