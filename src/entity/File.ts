import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
} from 'class-validator';

import { v4 as uuid } from 'uuid';
@Entity('filedata')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  @IsString({ message: 'Invalid file name: string only' })
  filename: string;

  @Column({ type: 'bigint' })
  @IsDefined()
  @IsPositive({ message: 'Invalid file size:integer number only > 0' })
  filesize: number;

  @Column()
  @IsDefined()
  @IsEnum(
    [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf',
    ],
    { message: 'Invalid file type:.pdf .docx .doc files only' },
  )
  filetype: string;

  @Column({ type: 'bigint' })
  @IsDefined()
  @IsInt({ message: 'Invalid date type: epoch time only' })
  lastmodified: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createUuid() {
    this.uuid = uuid();
  }

  toJson() {
    return { ...this, id: undefined };
  }
}
