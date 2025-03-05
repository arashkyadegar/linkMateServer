import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor() {
    super('TRYING_TO_ADD_A_DUPLICATE_Email', HttpStatus.BAD_REQUEST);
  }
}
