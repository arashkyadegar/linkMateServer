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

  @Column({ nullable: true })
  expirationDate: Date;
}
