import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module.js';
import { BooksModule } from './books/books.module.js';
import { GenresModule } from './genres/genres.module.js';
import { UsersModule } from './users/users.module.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, AuthModule, BooksModule, GenresModule, UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
