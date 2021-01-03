export interface ITranslation {
  id?: number;
  value?: string;
  translationkeyId?: number;
  languageId?: number;
}

export const defaultValue: Readonly<ITranslation> = {};
