import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class PasswordLinkEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  shortCode: string;

  @Column()
  originalUrl: string;

  @Column({ default: 0 })
  visitCount: number;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  userId: ObjectId | null;

  @Column({ default: false })
  isSingleUse: boolean;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ nullable: true })
  expirationDate: Date | null;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
