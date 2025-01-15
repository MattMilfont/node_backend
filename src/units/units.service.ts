import { Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class UnitsService {
    private pool;

    constructor(){
        this.pool = new Pool({
            host: '172.20.22.173',
            port: 5432, 
            user: 'mattmilfont',
            password: 'mattmilfont2025',
            database: 'homologacao'
        });
    }

    async getAllUnits(){
       const result = await this.pool.query('SELECT * FROM ejustica.unidade ORDER BY idunidade ASC');
       return result;
    }
}