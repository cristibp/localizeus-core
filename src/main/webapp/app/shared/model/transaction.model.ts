import { Moment } from 'moment';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';

export interface ITransaction {
  id?: number;
  amountInCents?: number;
  date?: string;
  status?: string;
  type?: TransactionType;
  serviceSubscriptionId?: number;
}

export const defaultValue: Readonly<ITransaction> = {};
