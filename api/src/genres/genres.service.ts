import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateGenreDto) {
    return this.prisma.genre.create({ data: dto }).catch(this.handle);
  }

  findAll() {
    return this.prisma.genre.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({ where: { id } });
    if (!genre) throw new NotFoundException(`Genre ${id} not found`);
    return genre;
  }

  async update(id: number, dto: UpdateGenreDto) {
    await this.findOne(id);
    return this.prisma.genre.update({ where: { id }, data: dto }).catch(this.handle);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.genre.delete({ where: { id } }).catch(this.handle);
  }

  private handle = (e: unknown): never => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') throw new ConflictException('Genre name already exists');
      if (e.code === 'P2003') throw new ConflictException('Genre still has books');
    }
    throw e;
  };
}