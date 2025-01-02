import {
  Body,
  Controller,
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

  @Get(':id')
  async getUserByID(@Param('id') id: number, @Res() res: Response) {
    try {
      const data = await this.authService.findUserById(id);
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      const treatment = {
        erro: 'Não foi possível realizar a busca.',
      };
      return res.status(500).json(treatment);
    }
  }

  @Post()
  async authentication(@Body() data: any, @Res() res: Response) {
    try {
      const response = await this.authService.authentication(data);
      if('error' in response){
        return res.status(500).json(response.error);
      }else{
        return res.status(200).json(response);
      }
    } catch (e) {
      const treatment = {
        erro: 'Não foi possível realizar a busca.',
      };
      return res.status(500).json(treatment);
    }
  }
}
