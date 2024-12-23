import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getExemplo(): string {
    return this.appService.getHello();
  }

  @Post()
  postExemplo(@Body() data: any): string {
    return `Hello, ${data.name}!`;
  }
}
