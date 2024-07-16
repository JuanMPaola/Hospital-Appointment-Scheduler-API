import { IsString, IsArray, ArrayNotEmpty} from 'class-validator';
import { UserDto } from '../../users/dto/user.dto'

export class DoctorDto extends UserDto {    
    id: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    specialties: string[];

    availability: Object;
}
