import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppoinmentsService } from './appoinments.service';
import { AppoinmentDto } from './dto/appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';

@Controller('appoinments')
export class AppoinmentsController {
  constructor(private readonly appoinmentsService: AppoinmentsService) {}

  @Post()
  create(@Body() appoinmentDto: AppoinmentDto) {
    return this.appoinmentsService.create(appoinmentDto);
  }

  @Get()
  findAll() {
    return this.appoinmentsService.findAll();
  }

/*   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appoinmentsService.findOne(+id);
  }
 */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppoinmentDto: UpdateAppoinmentDto) {
    return this.appoinmentsService.update(+id, updateAppoinmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appoinmentsService.remove(+id);
  }
}
