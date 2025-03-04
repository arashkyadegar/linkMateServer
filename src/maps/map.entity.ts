// src/maps/map.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MapEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  neshan: string;

  @Column({ default: '' })
  balad: string;

  @Column({ default: '' })
  googleMaps: string;
}
