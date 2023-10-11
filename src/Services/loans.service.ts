import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan } from 'src/Mongo/Schemas/loan.schema';

@Injectable()
export class LoansService {
  constructor(@InjectModel('Loan') private readonly loanModel: Model<Loan>) {}

  async borrowBook(
    bookId: string,
    borrowerId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Loan> {
    // Verifique se o livro está disponível para empréstimo

    // Crie um novo empréstimo
    const newLoan = new this.loanModel({
      book: bookId,
      borrower: borrowerId,
      startDate,
      endDate,
      returned: false, // O livro ainda não foi devolvido
    });

    // Salve o empréstimo no banco de dados
    const savedLoan = await newLoan.save();

    // Marque o livro como indisponível (por exemplo, atualizando seu status no modelo de livro)

    return savedLoan;
  }
}
