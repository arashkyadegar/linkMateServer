import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class VisitLogEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: true })
  linkType?: string;

  @Column({ nullable: true })
  linkId: ObjectId;


  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  region?: string;

  @Column({ nullable: true })
  latitude?: number;

  @Column({ nullable: true })
  longitude?: number;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ default: () => 'new Date()' })
  createdAt: Date;  // Add the createdAt field explicitly
}
