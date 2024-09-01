import {
  activeUUIDQuery,
  createTablesQuery,
  insertBasicInfoQuery,
  deleteTablesQuery,
} from './querysDB';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, PoolClient } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await this.client.connect();
  }

  // Function to create Tables if not exists, and to active UUID generative function.
  async createTables() {
    const reset = false;
    // Uncomment if you want to reset DB
    //reset = true;
    if (reset) {
      await this.client.query(deleteTablesQuery);
    }

    await this.client.query(activeUUIDQuery);
    await this.client.query(createTablesQuery);
    await this.client.query(insertBasicInfoQuery);
  }

  //Function that sent queries to db
  async query(text: string, params?: any[]) {
    return this.client.query(text, params);
  }

  async getClient(): Promise<PoolClient> {
    return this.client.connect();
  }
}
