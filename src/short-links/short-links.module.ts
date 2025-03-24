import { Module } from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLinksController } from './short-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkEntity } from './entities/short-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLinkEntity])],
  controllers: [ShortLinksController],
  providers: [ShortLinksService],
})
export class ShortLinksModule {}
