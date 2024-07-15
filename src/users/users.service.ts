import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PatientDto } from 'src/patients/dto/patient.dto';
import { DoctorDto } from 'src/doctors/dto/doctor.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService
  ) { }

  // This functions ensures that the roleData object is either a PatientDto or Doctor type
  private isPatientDto(roleData: PatientDto | DoctorDto): roleData is PatientDto {
    return (roleData as PatientDto).age !== undefined;
  }
  private isDoctorDto(roleData: PatientDto | DoctorDto): roleData is DoctorDto {
    return (roleData as DoctorDto).specialties !== undefined;
  }

  async create(user: UserDto, roleData: PatientDto | DoctorDto) {
    try {
      const existingUser = await this.findOneByEmail(user.email);
      
      if (existingUser) {
        throw new BadRequestException('Email already registered');
      }

      // Query to insert into users table (returns ID)
      const createUserQuery = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;

      // Extracting values from dto
      const userValues = [
        user.name,
        user.email,
        user.password,
        user.role
      ];

      // Sending query and values to db
      const userResult = await this.databaseService.query(createUserQuery, userValues);
      const userId = userResult.rows[0].id;

      // Using patient and doctor service to create patient or doctor
      if (user.role === 'patient' && this.isPatientDto(roleData)) {
        await this.patientsService.create(userId, roleData);

      } else if (user.role === 'doctor' && this.isDoctorDto(roleData)) {
        await this.doctorsService.create(userId, roleData);
        
      } else {
        throw new BadRequestException('Invalid role or role data');
      }

      return { id: userId, ...user };
      
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const getAllUsersQuery = `
        SELECT * FROM users;
      `;
      const result = await this.databaseService.query(getAllUsersQuery);
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOneByEmail(email: string): Promise<UserDto | undefined> {
    try {

      // Query to find a user by email
      const getByEmailQuery = `
    SELECT * FROM users
    WHERE email = ($1);
    `

      const result = await this.databaseService.query(getByEmailQuery, [email])

      return;//result.rows[0]; 
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    try {
      const deleteUserQuery = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
      `;

      const result = await this.databaseService.query(deleteUserQuery, [id]);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
