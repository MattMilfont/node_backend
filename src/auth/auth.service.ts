import { Injectable } from '@nestjs/common';
import { createPool } from 'mysql2/promise';

@Injectable()
export class AuthService {
  private pool;

  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'desafio_pm',
    });
  }

  async findUserById(userId: number) {
    const query = 'SELECT * FROM users WHERE userID = ?';
    const values = [userId];
    const [result] = await this.pool.execute(query, values);
    return result;
  }

  async authentication(data: any) {
    const { email, password } = data;

    if (!email || !password) {
      const response = { error: 'Campos obrigatórios: email, senha' };
      return response;
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    const [result] = await this.pool.execute(query, [email]);

    if (result.length === 0) {
      const response = { error: 'Usuário não encontrado' };
      return response;
    }

    const user = result[0];
    if (user['password'] === password) {
      const response = user;

      return response;
    } else {
      const response = { error: 'Senha Incorreta' };
      return response;
    }
  }
}
