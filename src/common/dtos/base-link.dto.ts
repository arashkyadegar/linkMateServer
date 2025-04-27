import { Type } from 'class-transformer';
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
import { ObjectId } from 'mongodb';

export class BaseLinkDto {
  @IsOptional() // Allows the field to be undefined or null
  @Matches(/^$|^[a-zA-Z0-9]{1,12}$/, {
    message:
      'shortCode can be empty or must be 6-12 characters long containing only letters and numbers.',
  })
  shortCode: string | null;

  @IsString()
  @IsUrl({}, { message: 'originalUrl must be a valid URL.' })
  originalUrl: string;

  @IsInt()
  @Min(0, { message: 'visitCount cannot be negative.' })
  visitCount: number = 0;

  // @Matches(/^[a-f\d]{24}$/, { message: 'userId must be a valid ObjectId.' })
  userId: ObjectId | null;

  isSingleUse: boolean = false; // Default is false, meaning not single-use.

  isUsed: boolean = false; // Tracks usage status.

  @IsOptional()
  @IsDate()
  createdAt: Date;
}
