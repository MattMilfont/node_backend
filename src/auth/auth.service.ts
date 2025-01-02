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

  getHello(): string {
    return 'Hello World!';
  }

  async findUserById(userId: number) {

    const query = 'SELECT * FROM users WHERE userID = ?';
    const values = [userId];
    const [result] = await this.pool.execute(query, values);
    return result;
  }
}
