export interface ISpace {
  id: string,
  title?: string,
  description?: string,
  version: number,
}

export type ISpaceListed = Omit<ISpace, 'objects'>
export type ISpaceCreate = Omit<ISpace, | 'objects' | 'version'>;
export type ISpaceUpdate = ISpaceCreate;
export type ISpaceUserCreate = Omit<ISpaceCreate, 'id'>;
export type ISpaceUserUpdate = ISpaceCreate;

// Could create a type for each op but meh ..
export interface OpLogEntry {
  name: 'newSpace' | 'updateSpace' | 'deleteSpace' | 'newComponent' | 'updateComponent' | 'deleteComponent';
  args: Record<string, any>;
}

export interface ISpaceRecord extends ISpace {
  uncommitedOpLog: OpLogEntry[];
}

export interface Query<T> {
  text?: string,
  filters?: Record<string, any>,
  sortByKey?: keyof T,
  fromValue?: any,
  dir?: -1|1,
  limit?: number,
}

export interface IUser {
  sub: string,
  email: string,
  email_verified: boolean,
  name?: string,
  given_name?: string,
  family_name?: string,
  picture?: string,
  [x: string]: string | number | boolean | undefined,
}

export type IUserProfile = IUser;
