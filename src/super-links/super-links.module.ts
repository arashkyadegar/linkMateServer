import { Module } from '@nestjs/common';
import { SuperLinksService } from './super-links.service';
import { LinksModule } from 'src/links/links.module';

@Module({
  imports: [LinksModule],

  providers: [SuperLinksService],
})
export class SuperLinksModule {}
