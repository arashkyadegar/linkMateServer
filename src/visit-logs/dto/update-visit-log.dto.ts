import { PartialType } from '@nestjs/swagger';
import { CreateVisitLogDto } from './create-visit-log.dto';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateVisitLogDto extends PartialType(CreateVisitLogDto) {
      // @IsString()
      id: string;
    
      @IsOptional()
      @IsDate()
      updatedAt: Date ;
}
