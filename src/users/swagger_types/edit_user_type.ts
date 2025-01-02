import { ApiProperty } from '@nestjs/swagger';

export class EditUserType {
  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  password: string;
}
