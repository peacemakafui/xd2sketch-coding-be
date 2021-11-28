import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
@Entity("filedata")
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ type: "bigint" })
  filesize: number;

  @Column()
  filetype: string;

  @Column({ type: "bigint" })
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
