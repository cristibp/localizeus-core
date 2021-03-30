import {ITranslation} from "app/shared/model/translation.model";
import {ITranslationKey} from "app/shared/model/translation-key.model";
import {IKeyLabel} from "app/shared/model/key-label.model";

export interface IKeyManagementView {
  translationKey?: ITranslationKey;
  translations?: ITranslation[];
  labels?: IKeyLabel[];
}

export const defaultValue: Readonly<IKeyManagementView> = {};
