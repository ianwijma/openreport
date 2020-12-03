import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ReportTypeEnum } from '../enums/report-type.enum';

@Entity()
@Unique(['type', 'identifier'])
export class ReportEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ReportTypeEnum;

  @Column()
  identifier: string;
}
