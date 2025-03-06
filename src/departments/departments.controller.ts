import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from './create-department.dto';

import {
  FindAllDepartments,
  GetDepartmentById,
} from './custom-decorator/swagger-decorator';

@Controller('departments')
export class DepartmentsController {
  static findAll(): any {
    throw new Error('Method not implemented.');
  }
  @FindAllDepartments() // Custom swagger-decorator for get all departments
  @Get()
  findAll(): any[] {
    return [];
  }

  @GetDepartmentById() // Custom swagger-decorator for department by id
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return `department ${id}`;
  }

  @Post()
  createOne(
    @Body(new ValidationPipe()) createDepartmentDto: CreateDepartmentDto,
  ) {
    return createDepartmentDto;
  }

  @Put('/:id')
  updateOne(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return updateDepartmentDto;
  }
}
