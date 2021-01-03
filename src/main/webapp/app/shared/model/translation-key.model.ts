export interface ITranslationKey {
  id?: number;
  name?: string;
  fallbackValue?: string;
  projectId?: number;
}

export const defaultValue: Readonly<ITranslationKey> = {};
