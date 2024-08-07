import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PatientDto } from 'src/patients/dto/patient.dto';
import { DoctorDto } from 'src/doctors/dto/doctor.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { createUserQuery, deleteUserQuery, getAllUsersQuery, getByEmailQuery, getRoleQuery } from './users.querys';


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
      throw new InternalServerErrorException('Could not create user', error.message);
    }
  }

  async findAll() {
    try {
      const result = await this.databaseService.query(getAllUsersQuery);
      return result.rows;
    } catch (error) {
      throw new Error('Could not get all users'), error;
    }
  }

  async findOneByEmail(email: string): Promise<UserDto | undefined> {
    try {
      const result = await this.databaseService.query(getByEmailQuery, [email]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not find users by email'), error;
    }
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
        await this.doctorsService.delete(id)
      }
      const result = await this.databaseService.query(deleteUserQuery, [id]);

      // End transaction
      this.databaseService.query('COMMIT');
      return result.rows[0];
    } catch (error) {

      // Rollback the transaction
      await this.databaseService.query('ROLLBACK');
      throw new Error('Could not delete user: ' + error.message);
    }
  }

  async getRole(id: string) {
    try {
      const result = await this.databaseService.query(getRoleQuery, [id]);
      return result.rows[0].role;
    } catch (error) {
      throw new Error('Error geting user role'), error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
