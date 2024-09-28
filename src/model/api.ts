/**
 * Very thin wrapper over API end point. Basically a lookup table of what API
 * endpoints exist and parameters in/out. USed to be inline with Connection class.
 */
import type Connection from './connection';
import { requireAuth } from './connection';
import type { ISpace, ISpaceCreate, ISpaceListed, OpLogEntry, IPlaceQuery, IPlace } from '@/types';


export default class Api {

  constructor(private connection: Connection) {} // eslint-disable-line

  async version(): Promise<string> {
    return (await this.axiosInstance.get('/version')).data;
  }

  get axiosInstance() {
    return this.connection.axiosInstance;
  }

  get headers() {
    return this.connection.headers;
  }

  @requireAuth()
  async createSpace(space: ISpaceCreate): Promise<ISpace> {
    const res = await this.axiosInstance.post(
      '/spaces',
      space,
      this.headers
    );
    return res.data;
  }

  @requireAuth()
  async getSpaces(): Promise<ISpaceListed[]> {
    const res = await this.axiosInstance.get(
      '/spaces/',
      this.headers,
    );
    return res.data;
  }

  // @requireApi()
  async getSpace(id: string): Promise<ISpaceListed> { // Promise<{ data: Record<string, GeoObject>, opLogPointer: string}> {
    const res = await this.axiosInstance.get(
      `/spaces/${id}`,
      this.headers,
    );
    return res.data;
  }

  /**
   * @returns ops that must be replayed and new version number
   */
  @requireAuth()
  async sync(spaceId: string, ops: OpLogEntry[], version: number): Promise<{ newOps: OpLogEntry[], newVersion: number }> {
    const res = await this.axiosInstance.post(
      `/spaces/${spaceId}/sync`,
      { ops, version },
      this.headers,
    );
    return res.data;
  }

  async places(query: IPlaceQuery): Promise<IPlace[]> {
    const res = await this.axiosInstance.get(
      `/places?${new URLSearchParams(query as Record<string, any>).toString()}`,
      this.headers,
    );
    return res.data?.data || [];
  }
}
