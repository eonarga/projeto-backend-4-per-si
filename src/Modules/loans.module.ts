import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoansController } from 'src/Controllers/loans.controller';
import { LoansService } from 'src/Services/loans.service';
import { LoanSchema } from 'src/Mongo/Schemas/loan.schema';
import { BooksModule } from './books.module';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forFeature([{ name: 'Loan', schema: LoanSchema }]),
  ],
  controllers: [LoansController],
  providers: [LoansService, BooksModule],
})
export class LoansModule {}
