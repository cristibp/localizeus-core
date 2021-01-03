export interface ITranslation {
  id?: number;
  value?: string;
  translationKeyId?: number;
  languageId?: number;
}

export const defaultValue: Readonly<ITranslation> = {};
