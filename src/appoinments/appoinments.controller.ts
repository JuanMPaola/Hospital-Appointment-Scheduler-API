import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { appointmentExample, cancelAppointmentResponseExample, deleteAppointmentResponseExample, getAppointmetnsResponseExample, getUserAppointmentsResponseExample, postAppointmentsResponseExample, postNearestAppointmentResponseExample, updateAppointmentExample, updateAppointmentExampleBody, updateAppointmentResponseExample } from '../utils/examples/appointments.example';
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
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    example: postAppointmentsResponseExample
  })
  @ApiBody({
    description: '',
    examples: {Example1: appointmentExample},
  })
  create(@Body() appoinmentDto: AppoinmentDto) {
    return this.appoinmentsService.create(appoinmentDto);
  }

  @Post('nearest/:specialtie/:patientId')
  @ApiCreatedResponse(postNearestAppointmentResponseExample)
  nearestAppointment(@Param('specialtie') specialtieId: number, @Param('patientId') patientId: string){
    return this.appoinmentsService.createNearest(specialtieId, patientId)
  }

  @Get()
  @ApiOkResponse({
    description:'',
    example: getAppointmetnsResponseExample
  })
  findAll() {
    return this.appoinmentsService.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({
    description:'',
    example: getUserAppointmentsResponseExample
  })
  findAllByUserId(@Param('userId') userId: string) {
    return this.appoinmentsService.findAllByUserId(userId);
  }

  @Patch('cancel/:id')
  @ApiOkResponse({
    description:'',
    example: cancelAppointmentResponseExample
  })
  cancel(@Param('id') id: string) {
    return this.appoinmentsService.cancel(id);
  }

  @Patch(':id')
  @ApiBody({
    description: '',
    examples: {Example: updateAppointmentExampleBody},
  })
  @ApiOkResponse({
    description:'',
    example: updateAppointmentResponseExample
  })
  @ApiOkResponse(updateAppointmentExample)
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppoinmentDto) {
    return this.appoinmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description:'This endpoint is intended for urgent/error cases only. For regular cancellations, please use the designated cancellation endpoint to ensure proper tracking and processing of appointments.',
    example: deleteAppointmentResponseExample
  })
  remove(@Param('id') id: number) {
    return this.appoinmentsService.delete(id);
  }

/*   @Get('specific')
  findSpecificAppointment(@Body() appointmentDto: AppoinmentDto) {
    return this.appoinmentsService.findSpecificAppointment(appointmentDto);
  } */
}
