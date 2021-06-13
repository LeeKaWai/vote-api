import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';

import { CacheModuleOption } from '../interfaces';

import { CacheService as BaseCacheService } from '../cache.service';

export class CacheService extends BaseCacheService {
  private _cache: WrappedNodeRedisClient;
  constructor(private readonly options: CacheModuleOption) {
    super();
    const { url, password } = options;
    this._cache = createNodeRedisClient({
      url: `redis://${password}@${url}:${process.env.REDIS_PROT}`,
    });
  }

  /**
   * 获取 redis 缓存
   * @param key key
   * @returns
   */
  public async get(key: any) {
    const result = await this._cache.get(JSON.stringify(key));
    return JSON.parse(result);
  }

  // Override
  /**
   * 新增 redis 缓存
   * @param key key
   * @param value 缓存值
   * @param ttl 过期时间(单位为秒。默认10分钟)
   * @returns
   */
  public async set(key: any, value: any, ttl?: number) {
    return this._cache.set(JSON.stringify(key), JSON.stringify(value), [
      'EX',
      ttl || 600,
    ]);
  }

  // Override
  /**
   * 删除 redis 缓存
   * @param key key
   * @returns
   */
  public async delete(key: any) {
    return this._cache.del(JSON.stringify(key));
  }
}
