import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoansController } from 'src/Controllers/loans.controller';
import { LoansService } from 'src/Services/loans.service';
import { LoanSchema } from 'src/Mongo/Schemas/loan.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Loan', schema: LoanSchema }])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
