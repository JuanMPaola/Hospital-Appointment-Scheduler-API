import { IsDate, IsNumber, IsString } from "class-validator";

export class AppoinmentDto {
    @IsString()
    doctor_id: string;

    @IsString()
    patient_id: string;

    @IsDate()
    date: Date;

    @IsNumber()
    time_rage_id: number;
    
    @IsString()
    status: string;
}
