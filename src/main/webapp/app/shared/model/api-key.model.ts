import { Moment } from 'moment';

export interface IApiKey {
  id?: number;
  value?: string;
  startDate?: string;
  endDate?: string;
  userId?: number;
}

export const defaultValue: Readonly<IApiKey> = {};
