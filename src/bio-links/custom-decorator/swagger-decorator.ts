// swagger-decorators.ts
import {
  applyDecorators,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';

export function findOneBioLinkById() {
  return applyDecorators(
    ApiOperation({ summary: 'get bioLink by id' }),
    ApiParam({ name: 'id', description: "bioLink's id", example: '1' }),
    ApiResponse({
      type: ApiOkResponse,
      status: HttpStatus.OK,
      description: 'bioLink is fetched by id successfully',
      example: {
        name: 'biolink name',
        maps: {
          neshan: 'neshan-link',
          balad: 'balad-link',
          googleMaps: 'googleMaps-link',
        },
        userId: 1,
        link: 'sample link',
        video: 'video link',
        title: 'title',
        desc: 'description',

        links: [{ id: '1', title: 'title', link: 'link' }],

        superLinks: [
          { id: '1', title: 'title', link: 'link', subTitle: 'subTitle' },
        ],

        slider: [
          {
            id: '1',
            title: 'title',
            link: 'link',
            userId: '1',
            name: 'name',
            alt: 'alt text',
          },
        ],
      },
    }),
    ApiBadRequestResponse({
      type: NotFoundException,
      description: 'id is invalid or bioLink is not found',
      example: {},
    }),
    ApiBadRequestResponse({
      type: UnauthorizedException,
      description: 'access-token cookie is not provied or its invalid',
      example: {},
    }),
  );
}

export function findAllBioLinks() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all bioLinks' }),
    ApiResponse({ description: 'bioLinks list fetched successfully' }),
    ApiBadRequestResponse({
      type: UnauthorizedException,
      description: 'access-token cookie is not provied or its invalid',
      example: {},
    }),
  );
}

export function createOneBioLink() {
  return applyDecorators(
    ApiOperation({ summary: 'add given bioLink into Db' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'bioLink created successfully',
    }),
    ApiBadRequestResponse({
      type: BadRequestException,
      description: 'bioLink is not valid',
      example: {},
    }),
    ApiBadRequestResponse({
      type: UnauthorizedException,
      description: 'access-token cookie is not provied or its invalid',
      example: {},
    }),
  );
}

export function updateOneBioLink() {
  return applyDecorators(
    ApiOperation({ summary: 'update/put given bioLink into Db' }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'bioLink updated successfully',
    }),

    ApiBadRequestResponse({
      type: NotFoundException,
      description: 'bioLinks id not valid ot its not valid',
      example: {},
    }),

    ApiBadRequestResponse({
      type: BadRequestException,
      description: 'bioLink is not valid',
      example: {},
    }),

    ApiBadRequestResponse({
      type: UnauthorizedException,
      description: 'access-token cookie is not provied or its invalid',
      example: {},
    }),
  );
}

export function deleteOneBioLink() {
  return applyDecorators(
    ApiOperation({ summary: 'delete given bioLink from db' }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'bioLink deleted successfully',
    }),

    ApiBadRequestResponse({
      type: NotFoundException,
      description: 'bioLinks id not valid ot its not valid',
      example: {},
    }),

    ApiBadRequestResponse({
      type: UnauthorizedException,
      description: 'access-token cookie is not provied or its invalid',
      example: {},
    }),
  );
}
