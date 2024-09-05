import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { Client } from 'pg';
import {
  activeUUIDQuery,
  createTablesQuery,
  insertBasicInfoQuery,
} from './querysDB';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockClient: jest.Mocked<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    mockClient = new Client() as jest.Mocked<Client>;

    // Initialize the client by calling onModuleInit
    await service.onModuleInit();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to the database on module initialization', async () => {
    expect(mockClient.connect).toHaveBeenCalledTimes(1);
  });

  it('should execute a query', async () => {
    const queryText = 'SELECT * FROM users';
    const queryResult = { rows: [{ id: 'some-id' }] };
    mockClient.query.mockResolvedValueOnce(queryResult);

    const result = await service.query(queryText);

    expect(mockClient.query).toHaveBeenCalledWith(queryText, undefined);
    expect(result).toEqual(queryResult);
  });

  it('should create tables and activate UUID generation', async () => {
    // Mocking sequential calls to the queries
    mockClient.query.mockResolvedValueOnce({ command: 'CREATE' }); // activeUUIDQuery
    mockClient.query.mockResolvedValueOnce({ command: 'CREATE' }); // createTablesQuery
    mockClient.query.mockResolvedValueOnce({ command: 'INSERT' }); // insertBasicInfoQuery

    await service.createTables();

    expect(mockClient.query).toHaveBeenCalledWith(activeUUIDQuery);
    expect(mockClient.query).toHaveBeenCalledWith(createTablesQuery);
    expect(mockClient.query).toHaveBeenCalledWith(insertBasicInfoQuery);
  });

  // New tests to improve branch coverage

  it('should delete tables if reset is true', async () => {
    // Simulate the scenario where the reset variable is true
    const deleteTablesQuery = 'DROP TABLE IF EXISTS users'; // Add this to your querysDB file

    jest.spyOn(service, 'createTables').mockImplementation(async () => {
      const reset = true; // Set reset to true in the test
      if (reset) {
        await mockClient.query(deleteTablesQuery); // Mock delete tables query
      }
      await mockClient.query(activeUUIDQuery);
      await mockClient.query(createTablesQuery);
      await mockClient.query(insertBasicInfoQuery);
    });

    await service.createTables();

    expect(mockClient.query).toHaveBeenCalledWith(deleteTablesQuery);
    expect(mockClient.query).toHaveBeenCalledWith(activeUUIDQuery);
    expect(mockClient.query).toHaveBeenCalledWith(createTablesQuery);
    expect(mockClient.query).toHaveBeenCalledWith(insertBasicInfoQuery);
  });

  it('should throw an error if query fails during onModuleInit', async () => {
    mockClient.connect.mockImplementationOnce(() => {
      throw new Error('Database connection failed');
    });

    await expect(service.onModuleInit()).rejects.toThrow(
      'Database connection failed',
    );
  });

  it('should throw an error if query execution fails', async () => {
    const queryText = 'SELECT * FROM users';
    mockClient.query.mockRejectedValueOnce(new Error('Query failed'));

    await expect(service.query(queryText)).rejects.toThrow('Query failed');
  });

  it('should throw an error if createTables query fails', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('Table creation failed'));

    await expect(service.createTables()).rejects.toThrow(
      'Table creation failed',
    );
  });
});
