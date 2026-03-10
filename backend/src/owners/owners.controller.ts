import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  create(@Body() body: CreateOwnerDto) {
    return this.ownersService.create(body);
  }

  @Get()
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateOwnerDto) {
    const updated = await this.ownersService.update(+id, body);
    if (!updated) {
      throw new NotFoundException(`Owner ${id} não encontrado`);
    }
    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownersService.remove(+id);
  }
}
