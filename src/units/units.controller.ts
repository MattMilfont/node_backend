import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { UnitsService } from './units.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitService: UnitsService) {}
  @Get()
    @ApiOperation({ summary: 'Busca os todas as unidades' })
    @ApiResponse({ status: 200, description: 'Unidade encontrada.' })
    @ApiResponse({ status: 404, description: 'Unidade não encontrada.' })
    @ApiResponse({ status: 500, description: 'Erro do Servidor Interno' })
    async getAllUnits(@Res() res: Response){
        try{
            const data = await this.unitService.getAllUnits();
            return res.status(200).json(data);
        } catch(e){
            console.log(e);
            const treatment = {
                erro: 'Não foi possível realizar a busca.',
            };
            return res.status(500).json(treatment);
        }
    }
}