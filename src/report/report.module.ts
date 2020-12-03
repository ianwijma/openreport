import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ReportService } from './services/report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportRepository } from './repositories/report.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReportRepository]), AuthModule],
  providers: [ReportService],
})
export class ReportModule {}
