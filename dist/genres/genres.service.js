var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
let GenresService = class GenresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.genre.create({ data: dto }).catch(this.handle);
    }
    findAll() {
        return this.prisma.genre.findMany({ orderBy: { name: 'asc' } });
    }
    async findOne(id) {
        const genre = await this.prisma.genre.findUnique({ where: { id } });
        if (!genre)
            throw new NotFoundException(`Genre ${id} not found`);
        return genre;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.genre.update({ where: { id }, data: dto }).catch(this.handle);
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.genre.delete({ where: { id } }).catch(this.handle);
    }
    handle = (e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002')
                throw new ConflictException('Genre name already exists');
            if (e.code === 'P2003')
                throw new ConflictException('Genre still has books');
        }
        throw e;
    };
};
GenresService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], GenresService);
export { GenresService };
//# sourceMappingURL=genres.service.js.map