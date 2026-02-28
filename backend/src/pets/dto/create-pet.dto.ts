import { IsNotEmpty, IsNumber, IsEnum, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PetType } from '../entities/pet.entity';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  age: number;

  @IsEnum(PetType)
  type: PetType;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @Type(() => Number)
  @IsNumber()
  ownerId: number;
}
