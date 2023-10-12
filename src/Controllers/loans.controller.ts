import { Controller, Post, Body } from '@nestjs/common';
import { LoansService } from 'src/Services/loans.service';
import { BooksService } from 'src/Services/books.service';

@Controller('loans')
export class LoansController {
  constructor(
    private readonly loansService: LoansService,
    private readonly booksService: BooksService,
  ) {}

  @Post('/borrow')
  async borrowBook(
    @Body('bookId') bookId: string,
    @Body('borrowerId') borrowerId: string,
    @Body('startDate') startDate: Date,
    @Body('endDate') endDate: Date,
  ) {
    try {
      const loan = await this.loansService.borrowBook(
        bookId,
        borrowerId,
        startDate,
        endDate,
      );
      await this.booksService.updateBookAvailability(bookId, false);

      return { message: 'Livro emprestado com sucesso', loan };
    } catch (error) {
      return { message: 'Não foi possível emprestar o livro', error };
    }
  }
}
