import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { IsDefined } from "class-validator";

import { v4 as uuid } from "uuid";
@Entity("filedata")
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  filename: string;

  @Column({ type: "bigint" })
  @IsDefined()
  filesize: number;

  @Column()
  @IsDefined()
  filetype: string;

  @Column({ type: "bigint" })
  @IsDefined()
  lastmodified: number;

  @Column({ type: "uuid" })
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
