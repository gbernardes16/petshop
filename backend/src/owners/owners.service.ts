import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownersRepository: Repository<Owner>,
  ) {}

  findAll() {
    return this.ownersRepository.find({
      relations: ['pets'],
    });
  }

  findOne(id: number) {
    return this.ownersRepository.findOne({
      where: { id },
      relations: ['pets'],
    });
  }

  async create(createOwnerDto: CreateOwnerDto) {
    const existing = await this.ownersRepository.findOne({
      where: { email: createOwnerDto.email },
    });

    if (existing) {
      throw new ConflictException('Email já cadastrado');
    }

    return this.ownersRepository.save(createOwnerDto);
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownersRepository.findOneBy({ id });
    if (!owner) return null;

    Object.assign(owner, updateOwnerDto);
    return this.ownersRepository.save(owner);
  }

  async remove(id: number) {
    const owner = await this.ownersRepository.findOne({
      where: { id },
      relations: ['pets'],
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    if (owner.pets.length > 0) {
      throw new BadRequestException('Cannot delete owner with registered pets');
    }

    await this.ownersRepository.delete(id);

    return { deleted: true };
  }
}
