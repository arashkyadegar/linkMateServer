import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class ShortLinkEntity {
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

  @Column({ nullable: true })
  isUsed: boolean;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
