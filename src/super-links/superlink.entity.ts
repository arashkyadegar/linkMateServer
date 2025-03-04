import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SuperLinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  subTitle: string;
}
