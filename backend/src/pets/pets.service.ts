import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { Owner } from '../owners/owner.entity';
import { PetType } from './entities/pet.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,

    @InjectRepository(Owner)
    private readonly ownersRepository: Repository<Owner>,
  ) {}

  async create(data: CreatePetDto) {
    const owner = await this.ownersRepository.findOne({
      where: { id: data.ownerId },
    });

    if (!owner) {
      throw new Error('Owner not found');
    }

    const pet = this.petsRepository.create({
      name: data.name,
      age: data.age,
      type: data.type,
      breed: data.breed,
      owner: owner,
    });

    return this.petsRepository.save(pet);
  }

  async findAll(page: number = 1, limit: number = 10, type?: string) {
    const where =
      type && Object.values(PetType).includes(type as PetType)
        ? { type: type as PetType }
        : {};

    const [data, total] = await this.petsRepository.findAndCount({
      where,
      relations: ['owner'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.petsRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    const pet = await this.petsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    // Se quiser trocar o owner
    if (updatePetDto.ownerId) {
      const newOwner = await this.ownersRepository.findOne({
        where: { id: updatePetDto.ownerId },
      });

      if (!newOwner) {
        throw new NotFoundException('Owner not found');
      }

      pet.owner = newOwner;
    }

    // Atualiza os outros campos
    pet.name = updatePetDto.name ?? pet.name;
    pet.age = updatePetDto.age ?? pet.age;
    pet.type = updatePetDto.type ?? pet.type;
    pet.breed = updatePetDto.breed ?? pet.breed;

    return this.petsRepository.save(pet);
  }

  async remove(id: number) {
    await this.petsRepository.delete(id);
    return { deleted: true };
  }
}
