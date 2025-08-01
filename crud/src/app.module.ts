import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/admin.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '168999',
      database: 'admin_db',
      schema: 'public',
      entities: [Admin],
      synchronize: true,
    }),
    AdminModule
  ],
})
export class AppModule {}
