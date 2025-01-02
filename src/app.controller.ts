import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put(':id')
  putExemplo(@Param('id') id: string, @Body() data: any): string {
    return `User with ID ${id} has been updated with name: ${data.name}`;
  }

  @Delete(':id')
  deleteExemplo(@Param('id') id: string, @Body() data: any): string {
    return `User with ID ${id} has been deleted!`;
  }
}
