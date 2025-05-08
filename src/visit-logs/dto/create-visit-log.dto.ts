
import {
    IsDate,
    IsNumber,
    isNumber,
    IsOptional,
    IsString
} from 'class-validator';
import { ObjectId } from 'mongodb';


export class CreateVisitLogDto {

    @IsOptional()
    linkType: string;

    @IsOptional()
    linkId: ObjectId | null;

    @IsOptional()
    @IsString()
    ip: string | undefined;

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    region: string;

    @IsOptional()
    @IsNumber()
    latitude: number;

    @IsOptional()
    @IsNumber()
    longitude: number;

    @IsOptional()
    @IsString()
    userAgent: string;

    @IsOptional()
    @IsDate()
    createdAt: Date;
}

