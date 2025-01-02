import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth') // Define a rota da api
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getExemplo(): string {
    return this.authService.getHello();
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
