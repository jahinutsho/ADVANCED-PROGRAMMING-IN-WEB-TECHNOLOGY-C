import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { HrModule } from './hr/hr.module';

@Module({
  imports: [AdminModule, EmployeeModule, HrModule],
  
})
export class AppModule {}
