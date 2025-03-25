import {
  IsAlphanumeric,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { ObjectId } from 'typeorm';

export class CreatePasswordLinkDto {
  @IsString()
  @Length(6, 12)
  @IsAlphanumeric()
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'shortCode can only contain letters and numbers.',
  })
  shortCode: string;

  @IsString()
  @IsUrl({}, { message: 'originalUrl must be a valid URL.' }) //valid url
  originalUrl: string;

  @IsInt()
  @Min(0, { message: 'visitCount cannot be negative.' })
  visitCount: number = 0;

  @Matches(/^[a-f\d]{24}$/, { message: 'userId must be a valid ObjectId.' })
  userId: ObjectId | null;

  @IsString()
  @Length(8)
  passwordHash: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;
}
