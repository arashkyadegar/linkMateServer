// src/biolink/biolink.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { MapEntity } from '../maps/map.entity';

@Entity()
export class BioLinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column()
  link: string;

  @Column()
  video: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @OneToOne(() => MapEntity, { cascade: true })
  @JoinColumn()
  map: MapEntity;
}
