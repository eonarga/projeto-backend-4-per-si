import { ObjectId } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { BookDTO } from 'src/DTO/book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/Mongo/Interfaces/book.interface';
import { BookRepository } from 'src/Mongo/Repository/book.repository';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBooks(): Promise<Book[]> {
    const allBooks = await this.bookRepository.getAllBooks();

    if (!allBooks.length)
      throw new BadRequestException('There are no books registered yet');
    else return allBooks;
  }

  async getBookById(bookID: string): Promise<Book> {
    try {
      return await this.bookRepository.getBookById(bookID);
    } catch (e) {
      throw new BadRequestException('This book does not exist');
    }
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    const foundBooks = await this.bookRepository.getBookByName(bookName);

    if (foundBooks.length) return foundBooks;
    else throw new BadRequestException('No results for this author');
  }

  async saveBook(newBook: BookDTO): Promise<Book> {
    return await this.bookRepository.saveBook(newBook);
  }

  async deleteBook(bookID: string): Promise<Book> {
    try {
      return await this.bookRepository.deleteBook(bookID);
    } catch (e) {
      throw new BadRequestException('This book does not exist.');
    }
  }

  async updateBook(bookID: string, newBook: BookDTO): Promise<Book> {
    const bookExists = await this.bookRepository.getBookById(bookID);

    if (!bookExists) throw new BadRequestException('No results.');

    const updatedBook = await this.bookRepository.updateBook(bookID, newBook);

    if (updatedBook) return this.bookRepository.getBookById(bookID);
  }

  async getBookByAuthorName(authorName: string): Promise<Book[]> {
    const authorNameArray = authorName.split(' ');

    const foundBooks =
      await this.bookRepository.getBookByAuthorName(authorNameArray);

    if (foundBooks.length) return foundBooks;
    else throw new BadRequestException('No results for this author');
  }
}
