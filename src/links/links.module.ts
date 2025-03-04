import { Module } from '@nestjs/common';
import { LinkEntity } from './link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
