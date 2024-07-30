import {
  BaseEntity as TypeOrmEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class DefaultEntity extends TypeOrmEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @Column({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt: Date;

  @Column({ name: "is_deleted", type: "boolean", default: false })
  isDeleted: boolean;
}
