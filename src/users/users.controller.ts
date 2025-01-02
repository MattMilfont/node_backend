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

import { Response } from 'express';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: any,
    @Res() res: Response,
  ) {
    try {
      const response = await this.usersService.updateUser(id, body);
      if ('error' in response) {
        return res.status(500).json(response.error);
      } else {
        return res.status(200).json(response);
      }
    } catch (e) {
      console.log(e);
      const treatment = {
        erro: 'Não foi possível realizar a busca.',
      };
      return res.status(500).json(treatment);
    }
  }
}
