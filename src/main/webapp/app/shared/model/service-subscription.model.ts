import { Moment } from 'moment';
import { Periodicity } from 'app/shared/model/enumerations/periodicity.model';

export interface IServiceSubscription {
  id?: number;
  start?: string;
  end?: string;
  paymentType?: Periodicity;
  companyId?: number;
  planId?: number;
}

export const defaultValue: Readonly<IServiceSubscription> = {};
