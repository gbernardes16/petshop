import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Owner } from '../../owners/owner.entity';

export enum PetType {
  CAT = 'CAT',
  DOG = 'DOG',
}

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: PetType,
  })
  type: PetType;

  @Column()
  breed: string;

  @ManyToOne(() => Owner, (owner) => owner.pets, {
    onDelete: 'CASCADE',
  })
  owner: Owner;
}
