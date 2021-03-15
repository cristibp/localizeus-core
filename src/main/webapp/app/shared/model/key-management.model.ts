import {ITranslation} from "app/shared/model/translation.model";

export interface IKeyManagementView {
  id?: number;
  name?: string;
  fallbackValue?: string;
  translations?: ITranslation[];
}

export const defaultValue: Readonly<IKeyManagementView> = {};
