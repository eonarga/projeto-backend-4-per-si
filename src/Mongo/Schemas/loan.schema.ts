import { Schema } from 'mongoose';
import { AuthorSchema } from '../Schemas/author.schema';
import * as mongoose from 'mongoose';

export const LoanSchema = new Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  borrower: String, // Pode ser uma referência ao usuário
  startDate: Date,
  endDate: Date,
  returned: Boolean,
});

export interface Loan extends mongoose.Document {
  book: string;
  borrower: string;
  startDate: Date;
  endDate: Date;
  returned: boolean;
}
