import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationType {
  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  password: string;
}
