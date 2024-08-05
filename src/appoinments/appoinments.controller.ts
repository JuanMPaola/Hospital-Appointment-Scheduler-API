import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { appointmentExample } from 'src/utils/examples';

@ApiTags('Appointments')
@ApiBearerAuth()
@Controller('appoinments')
export class AppoinmentsController {
  constructor(private readonly appoinmentsService: AppoinmentsService) {}

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

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.appoinmentsService.updateStatus(id, status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppoinmentDto) {
    return this.appoinmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appoinmentsService.deleteAllByDocOrPatientId(id);
  }

/*   @Get('specific')
  findSpecificAppointment(@Body() appointmentDto: AppoinmentDto) {
    return this.appoinmentsService.findSpecificAppointment(appointmentDto);
  } */
}
