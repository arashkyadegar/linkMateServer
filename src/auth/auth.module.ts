import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt.strategy';
import { EnvConfigModule } from 'src/env-config/env-config.module';
import { EnvConfigService } from 'src/env-config/env-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [EnvConfigService], // Inject the global service
      useFactory: (configService: EnvConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, UsersService, AuthService],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
