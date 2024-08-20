import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { appointmentExample, updateAppointmentExample, updateAppointmentExampleBody } from '../utils/examples/appointments.example';
import { unauthorizedResponseExample } from '../utils/examples/unauthorized.example';

@ApiTags('Appointments')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unathorized Bearer Auth',
  example: unauthorizedResponseExample
})
@Controller('appoinments')
export class AppoinmentsController {
  constructor(private readonly appoinmentsService: AppoinmentsService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    //example: 
  })
  @ApiBody({
    description: '',
    examples: {Example1: appointmentExample},
  })
  @Post()
  create(@Body() appoinmentDto: AppoinmentDto) {
    return this.appoinmentsService.create(appoinmentDto);
  }

  @Post('nearest/:specialtie/:patientId')
  nearestAppointment(@Param('specialtie') specialtieId: number, @Param('patientId') patientId: string){
    return this.appoinmentsService.createNearest(specialtieId, patientId)
  }

  @Get()
  findAll() {
    return this.appoinmentsService.findAll();
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.appoinmentsService.findAllByUserId(userId);
  }

  @Patch('cancel/:id')
  cancel(@Param('id') id: string) {
    return this.appoinmentsService.cancel(id);
  }

  @ApiBody({
    description: '',
    examples: {Example: updateAppointmentExampleBody},
  })
  @ApiOkResponse(updateAppointmentExample)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppoinmentDto) {
    return this.appoinmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appoinmentsService.delete(id);
  }

/*   @Get('specific')
  findSpecificAppointment(@Body() appointmentDto: AppoinmentDto) {
    return this.appoinmentsService.findSpecificAppointment(appointmentDto);
  } */
}
