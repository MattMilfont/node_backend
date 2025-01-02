import { Injectable } from '@nestjs/common';
import { response } from 'express';
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

  async deleteUser(id: number) {
    const query = 'DELETE FROM users WHERE userID = ?';
    await this.pool.execute(query, [id]);
    const response = { success: 'Usuário deletado com sucesso!' };

    return response;
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
