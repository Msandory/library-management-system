var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
let BooksService = class BooksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(q) {
        const page = Math.max(q.page, 1);
        const limit = Math.min(Math.max(q.limit, 1), 100);
        const where = {
            ...(q.genreId ? { genreId: q.genreId } : {}),
            ...(q.search
                ? {
                    OR: [
                        { title: { contains: q.search, mode: 'insensitive' } },
                        { author: { contains: q.search, mode: 'insensitive' } },
                    ],
                }
                : {}),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.book.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { title: 'asc' },
                include: { genre: true },
            }),
            this.prisma.book.count({ where }),
        ]);
        return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async findOne(id) {
        const book = await this.prisma.book.findUnique({ where: { id }, include: { genre: true } });
        if (!book)
            throw new NotFoundException(`Book ${id} not found`);
        return book;
    }
    async create(dto) {
        return this.prisma.book.create({ data: dto }).catch(this.handle);
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.book.update({ where: { id }, data: dto }).catch(this.handle);
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.book.delete({ where: { id } });
    }
    handle = (e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002')
                throw new ConflictException('ISBN already exists');
            if (e.code === 'P2003')
                throw new BadRequestException('genreId does not exist');
        }
        throw e;
    };
};
BooksService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BooksService);
export { BooksService };
//# sourceMappingURL=books.service.js.map