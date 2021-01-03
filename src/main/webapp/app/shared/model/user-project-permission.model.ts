export interface IUserProjectPermission {
  id?: number;
  userId?: number;
  projectId?: number;
  userPermissionId?: number;
}

export const defaultValue: Readonly<IUserProjectPermission> = {};
