import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { Response } from 'express';

@Controller('auth') // Define a rota da api
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getExemplo(): string {
    return this.authService.getHello();
  }

  @Get(':id')
  async getUserByID(@Param('id') id: number, @Res() res: Response) {
    try {
      const data = await this.authService.findUserById(id);
      return res.status(500).json(data);
    } catch (e) {
      console.log(e);
      const treatment = {
        erro: 'Não foi possível realizar a busca.',
      };
      return res.status(500).json(treatment);
    }
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
