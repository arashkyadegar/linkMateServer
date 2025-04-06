import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { BioLinksModule } from './bio-links/bio-links.module';
import { MapsModule } from './maps/maps.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BioLinkEntity } from './bio-links/biolink.entity';
import { MapEntity } from './maps/map.entity';
import { LinksModule } from './links/links.module';
import { SuperLinksModule } from './super-links/super-links.module';
import { ImagesModule } from './images/images.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { CookieMiddleware } from './middlewares/cookieMiddleware';
import { EnvConfigModule } from './env-config/env-config.module';
import { OneTimeLinksModule } from './one-time-links/one-time-links.module';
import { PasswordLinksModule } from './password-links/password-links.module';
import { ShortLinksModule } from './short-links/short-links.module';
import { ShortLinkEntity } from './short-links/entities/short-link.entity';
import { RandomWordsModule } from './random-words/random-words.module';
import { OptionalAuthMiddleware } from './middlewares/optionalCookieMiddleware';
import { PasswordLinkEntity } from './password-links/entities/password-link.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'dmpanel',
      // useUnifiedTopology: true,
      entities: [
        BioLinkEntity,
        MapEntity,
        UserEntity,
        ShortLinkEntity,
        PasswordLinkEntity,
      ],
      // synchronize: true,
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'arashk',
    //   database: 'dmpanel',
    //   entities: [BioLinkEntity, MapEntity, UserEntity],
    //   synchronize: true,
    // }),

    ImagesModule,
    SuperLinksModule,
    LinksModule,
    DepartmentsModule,
    MapsModule,
    BioLinksModule,
    ImagesModule,
    UploadsModule,
    UsersModule,
    AuthModule,
    EnvConfigModule,
    OneTimeLinksModule,
    PasswordLinksModule,
    ShortLinksModule,
    RandomWordsModule,
  ],
  controllers: [],
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


      { path: 'password-links', method: RequestMethod.ALL },
      { path: 'password-links/:id', method: RequestMethod.GET },
      { path: 'password-links/:id', method: RequestMethod.DELETE },
      { path: 'password-links/findbyuserid', method: RequestMethod.GET },
    );

    // Apply optional OptionalAuthMiddleware
    consumer
      .apply(OptionalAuthMiddleware)
      .forRoutes({ path: 'short-links', method: RequestMethod.POST });
  }
}
