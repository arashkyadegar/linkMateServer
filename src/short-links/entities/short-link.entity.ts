import { Column, ObjectId, ObjectIdColumn } from 'typeorm';

export class ShortLinkEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  shortCode: string;

  @Column()
  originalUrl: string;

  @Column({ default: 0 })
  visitCount: number;

  @ObjectIdColumn()
  userId: ObjectId;

  @Column({ default: false })
  isSingleUse: boolean;

  @Column({ nullable: true })
  isUsed: boolean;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
