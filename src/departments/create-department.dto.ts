import {
  IsString,
  Length,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @Length(3, 10)
  name: string;
}

export class UpdateDepartmentDto extends CreateDepartmentDto {
  @IsString()
  id: string;
}
