import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from './users.service';
import { EditUserType } from './swagger_types/edit_user_type';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Busca os dados de um usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro do Servidor Interno' })
  async getUserByID(@Param('id') id: number, @Res() res: Response) {
    try {
      const data = await this.usersService.findUserById(id);
      return res.status(200).json(data);
    } catch (e) {
      console.log(e);
      const treatment = {
        erro: 'Não foi possível realizar a busca.',
      };
      return res.status(500).json(treatment);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edita os dados de um usuário por ID' })
  @ApiBody({
    description: 'Informações de edição de usuário',
    type: EditUserType,
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro do Servidor Interno' })
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
