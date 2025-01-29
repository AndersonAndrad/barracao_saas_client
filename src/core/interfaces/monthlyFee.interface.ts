import { User } from './user.interface';

export interface MonthlyFee {
  _id: string;
  code: string;
  user: User;
  dueDate: Date;
  paymentDate?: Date;
  amount: number;
  amountPaid?: number;
  differenceAmount?: number;
  status: MonthlyFeeStatus;
  processedBy?: User;
  /**
   * @todo define interface by bill
   */
  bill?: any;
  startDate: Date;
  endDate: Date;
  notes?: string;
}

export enum MonthlyFeeStatus {
  PAID = 'paid',
  OVERDUE = 'overdue',
  PENDING = 'pending',
}

export interface MonthlyFeePayment
  extends Pick<MonthlyFee, 'code' | 'paymentDate' | 'amountPaid' | 'notes'> { }

export interface CreateMonthlyFee
  extends Omit<MonthlyFee, '_id' | 'code' | 'user' | 'endDate' | 'startDate' | 'status'> { }
