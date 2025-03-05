import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
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
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  GetAllDepartments,
  GetDepartmentById,
} from './custom-decorator/swagger-decorator';

@Controller('departments')
export class DepartmentsController {
  @GetAllDepartments() // Custom swagger-decorator for get all departments
  @Get()
  find() {
    return 'departments list';
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
