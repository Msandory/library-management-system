import {
  Body, Controller, DefaultValuePipe, Delete, Get, Param,
  ParseIntPipe, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@Controller('books')
export class BooksController {
  constructor(private books: BooksService) {}

  @Get()
  findAll(
    @Query('genreId', new ParseIntPipe({ optional: true })) genreId?: number,
    @Query('search') search?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.books.findAll({ genreId, search, page, limit });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.books.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LIBRARIAN)
  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.books.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LIBRARIAN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.books.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.LIBRARIAN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.books.remove(id);
  }
}