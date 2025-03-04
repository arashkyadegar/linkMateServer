// src/biolink/biolink.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { MapEntity } from '../maps/map.entity';
import { LinkEntity } from '../links/link.entity';
import { SuperLinkEntity } from '../super-links/superlink.entity';
import { CreateImageDto } from '../images/create-image.dto';

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

  @Column('jsonb')
  links: LinkEntity[];

  @Column('jsonb')
  superLinks: SuperLinkEntity[];

  @Column('jsonb')
  slider: CreateImageDto[];

  @OneToOne(() => MapEntity, { cascade: true })
  @JoinColumn()
  map: MapEntity;
}
