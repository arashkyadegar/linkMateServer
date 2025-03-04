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

@Controller('departments')
export class DepartmentsController {
  @Get()
  find() {
    return 'departments list';
  }

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
