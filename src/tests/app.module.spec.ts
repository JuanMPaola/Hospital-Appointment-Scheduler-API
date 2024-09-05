import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PatientsModule } from '../patients/patients.module';
import { DatabaseModule } from '../database/database.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { AppoinmentsModule } from '../appoinments/appoinments.module';
import { APP_GUARD } from '@nestjs/core';

describe('AppModule', () => {
    let appModule: TestingModule;

    beforeEach(async () => {
        appModule = await Test.createTestingModule({
            imports: [
                PatientsModule,
                DatabaseModule,
                DoctorsModule,
                UsersModule,
                AuthModule,
                AppoinmentsModule,
            ],
            providers: [
                {
                    provide: APP_GUARD,
                    useClass: JwtAuthGuard,
                },
            ],
        }).compile();
    });

    it('should import all the necessary modules', () => {
        const patientsModule = appModule.get(PatientsModule);
        const databaseModule = appModule.get(DatabaseModule);
        const doctorsModule = appModule.get(DoctorsModule);
        const usersModule = appModule.get(UsersModule);
        const authModule = appModule.get(AuthModule);
        const appoinmentsModule = appModule.get(AppoinmentsModule);

        expect(patientsModule).toBeDefined();
        expect(databaseModule).toBeDefined();
        expect(doctorsModule).toBeDefined();
        expect(usersModule).toBeDefined();
        expect(authModule).toBeDefined();
        expect(appoinmentsModule).toBeDefined();
    });
});