import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { DatabaseService } from '../database/database.service';
import {
  bringAllAppointmentsQuery,
  createAppointmentQuery,
  findAppointmentsByUserIdQuery,
  updateAppointmentStatusQuery,
  updateAppointmentQuery,
  findSpecificAppointmentDoctorQuery,
  findSpecificAppointmentPatientQuery,
  deleteAppointmentById,
  findAppointmentByIdQuery,
} from './appoinmetns.querys';
import {
  findAllDoctorDataBySpecialityQuery,
  findeDoctorsWeekAvailabilityAndAppointments,
} from '../doctors/doctors.querys';
import { getPatientByIdQuery } from '../patients/patients.querys';
import { searchNearest, getDayIdFromDate } from './appoinments.helper';

@Injectable()
export class AppoinmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(appoinmentDto: AppoinmentDto) {
    try {
      await this.appointmentValidation(appoinmentDto);

      const dateObject = new Date(appoinmentDto.date);
      //Extracting values from dto
      const appoinmentValues = [
        appoinmentDto.doctor_id,
        appoinmentDto.patient_id,
        appoinmentDto.date,
        getDayIdFromDate(dateObject),
        appoinmentDto.time_range_id,
        appoinmentDto.status,
      ];

      // Send the query and values to db
      const appoinmentResult = await this.databaseService.query(
        createAppointmentQuery,
        appoinmentValues,
      );
      return appoinmentResult.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not create appointment',
        error.message,
      );
    }
  }

  async createNearest(specialtyId: number, patientId: string) {
    try {
      // Get patient info
      const patient = await this.databaseService.query(getPatientByIdQuery, [
        patientId,
      ]);
      if (!patient.rows[0]) {
        throw new Error('Missing patient');
      }
      // Get doctors by specialtie
      const doctors = await this.databaseService.query(
        findAllDoctorDataBySpecialityQuery,
        [specialtyId],
      );
      if (doctors.rows.length === 0) {
        return new InternalServerErrorException(
          'There are no doctors of that speciality available',
        );
      }
      const nearestAppointment = searchNearest(doctors.rows, patient.rows[0]);

      return this.create(nearestAppointment);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating nearest appointment',
        error.message,
      );
    }
  }

  async findAll() {
    try {
      const result = await this.databaseService.query(
        bringAllAppointmentsQuery,
      );
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not retrieve appointments: ' + error.message,
      );
    }
  }

  async findAllByUserId(userId: string) {
    try {
      const result = await this.databaseService.query(
        findAppointmentsByUserIdQuery,
        [userId],
      );
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not retrieve appointments: ' + error.message,
      );
    }
  }

  async cancel(id: string) {
    try {
      const result = await this.databaseService.query(
        updateAppointmentStatusQuery,
        [id],
      );

      // If no result notify
      if (result.rowCount === 0) {
        throw new NotFoundException(`Appointment with id ${id} not found`);
      }

      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not update appointment status: ' + error.message,
      );
    }
  }

  async update(id: string, updateAppointmentDto: UpdateAppoinmentDto) {
    try {
      //Validate info
      const appoinment = await this.databaseService.query(
        findAppointmentByIdQuery,
        [id],
      );
      if (appoinment.rows.length === 0) {
        throw new NotFoundException(`Appointment with id ${id} not found`);
      }
      await this.appointmentValidation(updateAppointmentDto);
      const dateObject = new Date(updateAppointmentDto.date);
      //Extracting values from dto
      const updateValues = [
        updateAppointmentDto.doctor_id,
        updateAppointmentDto.date,
        getDayIdFromDate(dateObject),
        updateAppointmentDto.time_range_id,
        id,
      ];
      const result = await this.databaseService.query(
        updateAppointmentQuery,
        updateValues,
      );
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not update appointment: ' + error.message,
      );
    }
  }

  async delete(appointmentId: number) {
    try {
      const result = await this.databaseService.query(deleteAppointmentById, [
        appointmentId,
      ]);
      return result.rows[0];
    } catch (error) {
      throw Error('Could not delete appointment');
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  async findSpecificAppointmentPatient(
    patient_id: string,
    date: Date,
    time_range_id: number,
  ) {
    try {
      const appointmentValues = [patient_id, date, time_range_id];

      const result = await this.databaseService.query(
        findSpecificAppointmentPatientQuery,
        appointmentValues,
      );
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Error finding specific appointment for patient: ' + error.message,
      );
    }
  }

  async findSpecificAppointmentDoctor(
    doctor_id: string,
    date: Date,
    time_range_id: number,
  ) {
    try {
      const appointmentValues = [doctor_id, date, time_range_id];

      const result = await this.databaseService.query(
        findSpecificAppointmentDoctorQuery,
        appointmentValues,
      );
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Error finding specific appointment for doctor: ' + error.message,
      );
    }
  }

  async appointmentValidation(
    appoinmentDto: AppoinmentDto | UpdateAppoinmentDto,
  ) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dateObject = new Date(appoinmentDto.date);

      if (dateObject <= today) {
        throw new Error('Appointment must be tomorrow or later');
      }

      const doctorData = await this.databaseService.query(
        findeDoctorsWeekAvailabilityAndAppointments,
        [appoinmentDto.doctor_id],
      );

      const { weekly_availability, appointments } = doctorData.rows[0];

      const dayId = getDayIdFromDate(dateObject);
      const timeRangeId = appoinmentDto.time_range_id;

      const availableTimeRanges = weekly_availability[dayId];
      if (!availableTimeRanges || !availableTimeRanges.includes(timeRangeId)) {
        throw new Error('Doctor is not available at the selected day and time');
      }

      const conflictingAppointment = appointments.find(
        (appointment) =>
          new Date(appointment.date).toDateString() ===
            dateObject.toDateString() &&
          appointment.time_range_id === timeRangeId,
      );

      if (conflictingAppointment) {
        throw new Error(
          'Doctor already has an appointment at the selected time',
        );
      }

      const patientAppointment = await this.findSpecificAppointmentPatient(
        appoinmentDto.patient_id,
        dateObject,
        appoinmentDto.time_range_id,
      );

      if (patientAppointment) {
        throw new Error(
          'Patient already has an appointment at the selected time',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error during appointment validation: ' + error.message,
      );
    }
  }
}
