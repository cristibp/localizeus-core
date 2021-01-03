export interface IUserProjectPermission {
  id?: number;
  userId?: number;
  projectId?: number;
  userpermissionId?: number;
}

export const defaultValue: Readonly<IUserProjectPermission> = {};
