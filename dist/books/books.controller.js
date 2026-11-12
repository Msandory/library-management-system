var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, } from '@nestjs/common';
import { Role } from '@prisma/client';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
let BooksController = class BooksController {
    books;
    constructor(books) {
        this.books = books;
    }
    findAll(genreId, search, page = 1, limit = 10) {
        return this.books.findAll({ genreId, search, page, limit });
    }
    findOne(id) {
        return this.books.findOne(id);
    }
    create(dto) {
        return this.books.create(dto);
    }
    update(id, dto) {
        return this.books.update(id, dto);
    }
    remove(id) {
        return this.books.remove(id);
    }
};
__decorate([
    Get(),
    __param(0, Query('genreId', new ParseIntPipe({ optional: true }))),
    __param(1, Query('search')),
    __param(2, Query('page', new DefaultValuePipe(1), ParseIntPipe)),
    __param(3, Query('limit', new DefaultValuePipe(10), ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object, Object]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "findOne", null);
__decorate([
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(Role.LIBRARIAN),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "create", null);
__decorate([
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(Role.LIBRARIAN),
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "update", null);
__decorate([
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(Role.LIBRARIAN),
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "remove", null);
BooksController = __decorate([
    Controller('books'),
    __metadata("design:paramtypes", [BooksService])
], BooksController);
export { BooksController };
//# sourceMappingURL=books.controller.js.map