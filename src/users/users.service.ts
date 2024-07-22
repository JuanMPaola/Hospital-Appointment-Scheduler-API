import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async create(user: PatientDto & DoctorDto) {
    try {
      // Check if email is registered
      const existingUser = await this.findOneByEmail(user.email);
      if (existingUser) {
        throw new BadRequestException('Email already registered');
      }

      // Start the transaction
      await this.databaseService.query('BEGIN');

      // Query to insert into users table (returns ID)
      const createUserQuery = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `;

      // Extracting values from dto. Sending query and values to db
      const userValues = [
        user.name,
        user.email,
        user.password,
        user.role
      ];
      const userResult = await this.databaseService.query(createUserQuery, userValues);
      const userId = userResult.rows[0].id;

      // Adding the userId to patient/doctor dto and sending it to respective service
      if (user.role === 'patient') {
        const patient: PatientDto = {
          ...user,
          id: userId
        };
        await this.patientsService.create(patient);

      } else if (user.role === 'doctor') {
        const doctor: DoctorDto = {
          ...user,
          id: userId
        };
        await this.doctorsService.create(doctor);

      } else {
        throw new BadRequestException('Invalid role or role data');
      }

      // End transaction
      this.databaseService.query('COMMIT');
      return { id: userId, ...user };

    } catch (error) {

      // Rollback the transaction to not store user if something go wrong in doc/patient service
      await this.databaseService.query('ROLLBACK');
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
      const getByEmailQuery = 'SELECT * FROM users WHERE email = $1;';
      const result = await this.databaseService.query(getByEmailQuery, [email]);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async delete(id: string) {
    try {
      // Start the transaction
      await this.databaseService.query('BEGIN');
      // Get if user is pacient or doctor
      const role = await this.getRole(id);

      // First delete the doc/patient part
      if (role === 'patient') {
        await this.patientsService.delete(id);
      } else if (role === 'doctor') {
        //await this.doctorsService.delete(id)
      }

      // Query to delete user form users table
      const deleteUserQuery = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
      `;
      const result = await this.databaseService.query(deleteUserQuery, [id]);

      if (result.rowCount === 0) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // End transaction
      this.databaseService.query('COMMIT');
      return result.rows[0];
    } catch (error) {

      // Rollback the transaction
      await this.databaseService.query('ROLLBACK');
      throw new InternalServerErrorException(error.message);
    }
  }

  async getRole(id: string) {
    try {
      const getRoleQuery = `
      SELECT role FROM users
      WHERE id = $1
      `
      const result = await this.databaseService.query(getRoleQuery, [id]);
      return result.rows[0].role;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
