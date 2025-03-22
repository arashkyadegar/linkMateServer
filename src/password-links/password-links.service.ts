import { Injectable } from '@nestjs/common';
import { CreatePasswordLinkDto } from './dto/create-password-link.dto';
import { UpdatePasswordLinkDto } from './dto/update-password-link.dto';

@Injectable()
export class PasswordLinksService {
  create(createPasswordLinkDto: CreatePasswordLinkDto) {
    return 'This action adds a new passwordLink';
  }

  findAll() {
    return `This action returns all passwordLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordLink`;
  }

  update(id: number, updatePasswordLinkDto: UpdatePasswordLinkDto) {
    return `This action updates a #${id} passwordLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordLink`;
  }
}
