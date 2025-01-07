import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthenticationType } from './swagger_types/authentication_type';

@ApiTags('Auth')
@Controller('auth') // Define a rota da api
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @ApiOperation({ summary: 'Autenticação do usuário' })
  @ApiBody({
    description: 'Informações de autorização de usuário',
    type: AuthenticationType,
  })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro do Servidor Interno' })
  async authentication(@Body() data: any, @Res() res: Response) {
    try {
      const response = await this.authService.authentication(data);
      if ('statusCode' in response) {
        if (response.statusCode == '401') {
          return res.status(401).json(response);
        } else {
          return res.status(400).json(response);
        }
      } else {
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
