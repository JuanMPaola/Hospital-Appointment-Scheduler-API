import { activeUUIDQuery, createTablesQuery, insertBasicInfoQuery, deleteTablesQuery } from './querysDB';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, PoolClient } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: Client;

  async onModuleInit() {
    this.client = new Client({ 
    connectionString: process.env.DATABASE_URL
/*       host: process.env.HOST,
      port: process.env.LPORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE */
    });
    await this.client.connect();
  }

  // Function to create Tables if not exists, and to active UUID generative function.
  async createTables() {
    // Uncomment if you want to reset DB
    //await this.client.query(deleteTablesQuery);
  
    await this.client.query(activeUUIDQuery);
    await this.client.query(createTablesQuery);
    await this.client.query(insertBasicInfoQuery);
    //console.log('Tables created successfully');

      
  }

  //Function that sent queries to db
  async query(text: string, params?: any[]) {
    return this.client.query(text, params);
  }
    
  async getClient(): Promise<PoolClient> {
    return this.client.connect();
  } 
}