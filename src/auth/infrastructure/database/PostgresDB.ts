import { Pool } from "pg";

class PostgresDB {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "batalla",
      port: 5432, // Puerto de PostgreSQL
    });
  }

  async query(text: string, values: any[] = []): Promise<any> {
    const client = await this.pool.connect();

    try {
      const result = await client.query(text, values);
      return result.rows;
    } finally {
      client.release();
    }
  }
}

export default PostgresDB;
