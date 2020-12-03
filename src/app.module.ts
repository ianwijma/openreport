import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, ReportModule],
})
export class AppModule {}
