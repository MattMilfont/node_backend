import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController], // Registra o controlador
  providers: [AuthService], // Registra o serviço
  exports: [AuthService], // Exporta o serviço (opcional, caso outros módulos precisem dele)
})
export class AuthModule {}
