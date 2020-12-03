import { ReportTypeEnum } from '../enums/report-type.enum';
import { IsIn, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewReportDto {
  @ApiProperty({
    default: ReportTypeEnum.IP_USER,
  })
  @IsIn([
    ReportTypeEnum.IP_USER,
    ReportTypeEnum.IP_SERVER,
    ReportTypeEnum.GAME_PLAYER,
    ReportTypeEnum.GAME_SERVER,
  ])
  type: ReportTypeEnum;

  @ApiProperty({
    default: '127.0.0.1',
  })
  @IsString()
  @MinLength(3)
  identifier: string;
}
