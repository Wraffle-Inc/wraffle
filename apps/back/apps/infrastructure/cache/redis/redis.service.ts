import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly redis: Cache) {}

  async get(key: string): Promise<any> {
    return await this.redis.get(key);
  }

  async set(key: string, value: any, option?: any) {
    const { ttl } = option;
    await this.redis.set(key, value, ttl);
  }

  async reset() {
    await this.redis.reset();
  }

  async del(key: string) {
    await this.redis.del(key);
  }
}
