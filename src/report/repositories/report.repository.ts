import { EntityRepository, Repository } from 'typeorm';

import { ReportEntity } from '../entities/report.entity';
import { NewReportDto } from '../dto/new-report.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(ReportEntity)
export class ReportRepository extends Repository<ReportEntity> {
  async newReport(newReportDto: NewReportDto): Promise<ReportEntity> {
    const { type, identifier } = newReportDto;
    const report = new ReportEntity();
    report.type = type;
    report.identifier = identifier;
    try {
      await report.save();
    } catch (error) {
      const { code } = error;
      if (code === '23505') {
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return report;
  }

  async ensureReport(newReportDto: NewReportDto): Promise<ReportEntity> {
    try {
      return await this.newReport(newReportDto);
    } catch (error) {
      console.log(error);
    }
  }
}
