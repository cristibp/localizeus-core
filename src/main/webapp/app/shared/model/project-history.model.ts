import { ProjectActions } from 'app/shared/model/enumerations/project-actions.model';

export interface IProjectHistory {
  id?: number;
  action?: ProjectActions;
  oldValue?: string;
  newValue?: string;
  userId?: number;
  translationKeyId?: number;
  translationId?: number;
}

export const defaultValue: Readonly<IProjectHistory> = {};
