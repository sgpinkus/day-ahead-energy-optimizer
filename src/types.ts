export type ComponentType = 'profile' | 'device' | 'bus';

export type Component = any;

export type AnonComponent = any;

export interface IBaseComponent {
  type: ComponentType;
  id: string;
  spaceId?: string;
  displayProps?: Record<string, string | number | boolean | undefined>;
  userProps?: Record<string, string | number | boolean | undefined>;
}

export interface IProfile extends IBaseComponent {
  type: 'profile';
}


export interface IDevice extends IBaseComponent {
  type: 'device';
}


export interface IBus extends IBaseComponent {
  type: 'bus';
}

export interface ISpace {
  id: string,
  title?: string,
  description?: string,
  objects: Record<string, Component>,
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
