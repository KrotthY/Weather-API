import { Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
@Module({
  imports: [
    CacheModule.register({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
            ttl: 600,
          },
        }),
      }),
    }),
    HttpModule,
  ],
  providers: [ExternalApiService],
  exports: [ExternalApiService],
})
export class ExternalApiModule {}
