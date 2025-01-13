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
      database: 'modelo_db',
    });
  }

  async authentication(data: any) {
    const { email, password } = data;

    if (!email || !password) {
      const response = { statusCode: '400', detailMessage: 'Bad Request' }; //bad request
      return response;
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    const [result] = await this.pool.execute(query, [email]);

    if (result.length === 0) {
      const response = {
        statusCode: '404',
        detailMessage: 'Usuário não encontrado',
      };
      return response;
    }

    const user = result[0];
    if (user['password'] === password) {
      const response = user;

      return response;
    } else {
      const response = {
        statusCode: '401',
        detailMessage: 'Email ou Senha Incorretos!',
      }; //unauthorized
      return response;
    }
  }
}
