import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { jwtConstants } from './constants/jwt.constants';

@Module({
  controllers: [AuthController],
  imports:
    [
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>("JWT_SECRET"),
          signOptions: { expiresIn: "1h" },
          global: true,
        }),
        //Condig JWT variable de entorno
        inject: [ConfigService],
      }),
      ConfigModule,
      forwardRef(() => UsersModule),

      // JwtModule.register({
      //   global: true,
      //   secret: jwtConstants.secret,
      //   signOptions: { expiresIn: "1h" },
      // }),
    ],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule { }
