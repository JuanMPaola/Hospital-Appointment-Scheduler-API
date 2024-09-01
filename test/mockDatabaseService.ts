import { DatabaseService } from '../src/database/database.service';

export class MockDatabaseService extends DatabaseService {
  query = jest.fn();
  onModuleInit = jest.fn();
  createTables = jest.fn();
  getClient = jest.fn();
}
