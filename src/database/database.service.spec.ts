import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { Client } from 'pg';
import { activeUUIDQuery, createTablesQuery, insertBasicInfoQuery } from './querysDB';

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
});
