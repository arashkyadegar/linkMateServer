import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class TimeLinkEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  shortCode: string;

  @Column()
  originalUrl: string;

  @Column({ default: 0 })
  visitCount: number;

  @Column({ nullable: true })
  userId: ObjectId | null;

  @Column({ default: false })
  isSingleUse: boolean;

  @Column({ default: false })
  isUsed: boolean;

  @Column()
  expirationDate: Date;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
