import { Controller, Get } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}
  
  @Get()
  findAll() {
    return this.mapsService.findAll()
  }
}
