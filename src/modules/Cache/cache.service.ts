import { Injectable } from '@nestjs/common';

/**
 * 通用缓存类
 */
@Injectable()
export class CacheService {
  /**
   * get value by key from cache
   * @param key
   */
  public get(key: any): Promise<string> {
    throw new Error('should be overwritten');
  }

  /**
   * add to cache
   *
   * @param key cache key
   * @param value cache value
   * @param ttl Time-To-Live, cache will be removed after the ime (in s)
   */
  public set(key: any, value: any, ttl?: number): Promise<any> {
    throw new Error('should be overwritten');
  }

  /**
   * remove data from cache
   *
   * @param key cache key
   */
  public delete(key: any): Promise<any> {
    throw new Error('should be overwritten');
  }
}
