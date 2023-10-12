import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './Controllers/books.controller';
import { BooksService } from './Services/books.service';
import { BookSchema } from './Mongo/Schemas/book.schema';
import { BookRepository } from './Mongo/Repository/book.repository';
import { LoansModule } from './Modules/loans.module';
import { BooksModule } from './Modules/books.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/biblioteca'),

    MongooseModule.forFeature([{ name: 'book', schema: BookSchema }]),
    BooksModule,
    LoansModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule {}
