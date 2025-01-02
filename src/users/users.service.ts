import { Injectable } from '@nestjs/common';
import { createPool } from 'mysql2/promise';

@Injectable()
export class UsersService {
  private pool;

  constructor() {
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'desafio_pm',
    });
  }

  async updateUser(id: number, body: any) {
    const query =
      'UPDATE users SET name = ?, email = ?, password = ? WHERE userID = ?';

    const { name, email, password } = body;

    if (!email || !password || !name) {
      const response = { error: 'Campos obrigatórios: email, senha' };
      return response;
    }

    const values = [name, email, password, id];
    await this.pool.execute(query, values);
    const response = { success: 'Edição feita com sucesso' };

    return response;
  }

  async findUserById(userId: number) {
    const query = 'SELECT * FROM users WHERE userID = ?';
    const values = [userId];
    const [result] = await this.pool.execute(query, values);
    return result;
  }
}
