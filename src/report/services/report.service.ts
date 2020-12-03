import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportRepository } from '../repositories/report.repository';
import { NewReportDto } from '../dto/new-report.dto';
import { ReportEntity } from '../entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportRepository)
    private reportRepository: ReportRepository,
  ) {}

  ensureReport(newReportDto: NewReportDto): Promise<ReportEntity> {
    return this.reportRepository.ensureReport(newReportDto);
  }
}
