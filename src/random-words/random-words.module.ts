import { Module } from '@nestjs/common';
import { RandomWordsService } from './random-words.service';

@Module({
  providers: [RandomWordsService],
})
export class RandomWordsModule {
  exports: [RandomWordsService];
}
