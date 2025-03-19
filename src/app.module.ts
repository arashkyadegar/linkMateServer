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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'dmpanel',
      // useUnifiedTopology: true, 
      entities: [BioLinkEntity, MapEntity, UserEntity],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieMiddleware).forRoutes(
      { path: 'bio-links', method: RequestMethod.ALL }, // Apply to all methods of routes under 'user'
    );
  }
}
