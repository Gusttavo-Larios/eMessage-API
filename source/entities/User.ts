import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor() {
    if (!this.id) {
        this.id = uuid()
    }
  }
}
