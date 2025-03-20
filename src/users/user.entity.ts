// src/maps/map.entity.ts
import { Entity, Column, Unique, ObjectIdColumn, ObjectId } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  family: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
