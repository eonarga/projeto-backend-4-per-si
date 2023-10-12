import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from 'src/Controllers/books.controller';
import { BooksService } from 'src/Services/books.service';
import { BookSchema } from 'src/Mongo/Schemas/book.schema';
import { BookRepository } from '../Mongo/Repository/book.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class BooksModule {}
