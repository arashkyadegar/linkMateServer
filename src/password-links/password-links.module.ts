import { Module } from '@nestjs/common';
import { PasswordLinksService } from './password-links.service';
import { PasswordLinksController } from './password-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordLinkEntity } from './entities/password-link.entity';
import { RandomWordsModule } from 'src/random-words/random-words.module';
import { RandomWordsService } from 'src/random-words/random-words.service';
@Module({
  imports: [TypeOrmModule.forFeature([PasswordLinkEntity]), RandomWordsModule],
  controllers: [PasswordLinksController],
  providers: [PasswordLinksService, RandomWordsService],
})
export class PasswordLinksModule {}
