import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1/health-check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck() {
    return this.appService.getHealthCheck();
  }
}
