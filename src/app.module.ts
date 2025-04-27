import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { CookieMiddleware } from './middlewares/cookieMiddleware';
import { EnvConfigModule } from './env-config/env-config.module';
import { PasswordLinksModule } from './password-links/password-links.module';
import { ShortLinksModule } from './short-links/short-links.module';
import { ShortLinkEntity } from './short-links/entities/short-link.entity';
import { RandomWordsModule } from './random-words/random-words.module';
import { OptionalAuthMiddleware } from './middlewares/optionalCookieMiddleware';
import { PasswordLinkEntity } from './password-links/entities/password-link.entity';
import { TimeLinksModule } from './time-links/time-links.module';
import { TimeLinkEntity } from './time-links/entities/time-link.entity';
import { HomeController } from './home/home.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'dmpanel',
      // useUnifiedTopology: true,
      entities: [
        UserEntity,
        ShortLinkEntity,
        PasswordLinkEntity,
        TimeLinkEntity
      ],
      // synchronize: true,
    }),

    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: process.env.MONGOOSE_URII,
    //   useUnifiedTopology: true,
    //   entities: [
    //     UserEntity,
    //     ShortLinkEntity,
    //     PasswordLinkEntity,
    //     TimeLinkEntity,
    //   ],
    //   // synchronize: true, // Only for development; avoid in production!
    // }),

    UsersModule,
    AuthModule,
    EnvConfigModule,
    PasswordLinksModule,
    ShortLinksModule,
    RandomWordsModule,
    TimeLinksModule,
  ],
  controllers: [HomeController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieMiddleware).forRoutes(
      { path: 'bio-links', method: RequestMethod.ALL }, // Apply to all methods of routes under 'user'
      { path: 'short-links/:id', method: RequestMethod.DELETE },
      { path: 'short-links/:id', method: RequestMethod.GET },
      { path: 'short-links/:id', method: RequestMethod.PUT },
      { path: 'short-links/findbyuserid', method: RequestMethod.GET },

      { path: 'password-links/unlock/:shortCode', method: RequestMethod.POST },
      { path: 'password-links', method: RequestMethod.ALL },
      { path: 'password-links/:id', method: RequestMethod.GET },
      { path: 'password-links/:id', method: RequestMethod.PUT },
      { path: 'password-links/:id', method: RequestMethod.DELETE },
      { path: 'password-links/findbyuserid', method: RequestMethod.GET },

      { path: 'time-links', method: RequestMethod.ALL },
      { path: 'time-links/:id', method: RequestMethod.GET },
      { path: 'time-links/:id', method: RequestMethod.PUT },
      { path: 'time-links/:id', method: RequestMethod.DELETE },
      { path: 'time-links/findbyuserid', method: RequestMethod.GET },
    );

    // Apply optional OptionalAuthMiddleware
    consumer
      .apply(OptionalAuthMiddleware)
      .forRoutes(
        { path: 'short-links', method: RequestMethod.POST },
        { path: 'short-links/shortlink/:shortCode', method: RequestMethod.GET },
      );
  }
}
