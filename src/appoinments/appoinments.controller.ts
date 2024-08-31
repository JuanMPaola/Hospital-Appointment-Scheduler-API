import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { swaggerCancelAppointmentResponseExample, swaggerDeleteAppointmentResponseExample, swaggerGetUserAppointmentsResponseExample, swaggerPostAppointmentExample, swaggerPostAppointmentResponseExample, swaggerPostNearestAppointmentResponseExample, swaggerUpdateAppointmentExample, swaggerUpdateAppointmentResponseExample } from '../utils/examples/appointments.example';
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

  @Post()
  @ApiCreatedResponse(swaggerPostAppointmentResponseExample)
  @ApiBody(swaggerPostAppointmentExample)
  create(@Body() appoinmentDto: AppoinmentDto) {
    return this.appoinmentsService.create(appoinmentDto);
  }

  @Post('nearest/:specialtie/:patientId')
  @ApiCreatedResponse(swaggerPostNearestAppointmentResponseExample)
  nearestAppointment(@Param('specialtie') specialtieId: number, @Param('patientId') patientId: string){
    return this.appoinmentsService.createNearest(specialtieId, patientId)
  }

  @Get()
  @ApiOkResponse(swaggerGetUserAppointmentsResponseExample)
  findAll() {
    return this.appoinmentsService.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse(swaggerGetUserAppointmentsResponseExample)
  findAllByUserId(@Param('userId') userId: string) {
    return this.appoinmentsService.findAllByUserId(userId);
  }

  @Patch('cancel/:id')
  @ApiOkResponse(swaggerCancelAppointmentResponseExample)
  cancel(@Param('id') id: string) {
    return this.appoinmentsService.cancel(id);
  }

  @Patch(':id')
  @ApiBody(swaggerUpdateAppointmentExample)
  @ApiOkResponse(swaggerUpdateAppointmentResponseExample)
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppoinmentDto) {
    return this.appoinmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOkResponse(swaggerDeleteAppointmentResponseExample)
  remove(@Param('id') id: number) {
    return this.appoinmentsService.delete(id);
  }
}
