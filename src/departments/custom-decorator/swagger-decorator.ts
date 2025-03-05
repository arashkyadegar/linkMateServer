// swagger-decorators.ts
import { applyDecorators, HttpStatus, NotFoundException } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';

export function GetDepartmentById() {
  return applyDecorators(
    ApiOperation({ summary: 'get department by id' }),
    ApiParam({ name: 'id', description: "department's id", example: '1' }),
    ApiResponse({
      type: ApiOkResponse,
      status: HttpStatus.OK,
      description: 'department is fetched by id successfully',
      example: { id: '1', name: 'management department' },
    }),
    ApiBadRequestResponse({
      type: NotFoundException,
      description: 'id is invalid or department is not found',
      example: {},
    }),
  );
}
export function GetAllDepartments() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all departments' }),
    ApiResponse({ description: 'Departments list fetched successfully' }),
  );
}
