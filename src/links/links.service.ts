import {
  BadRequestException,
  Injectable,
  ValidationError,
} from '@nestjs/common';
import { CreateLinkDto } from './create-link.dto';
import { validate } from 'class-validator';

@Injectable()
export class LinksService {
  constructor() // private linkRepository: Repository<LinkEntity>, // @InjectRepository(LinkEntity)
  {}


}
