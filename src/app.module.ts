import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PropertysModule } from './propertys/propertys.module';


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      ssl: process.env.MYSQL_SSL === "true",
      extra: {
        ssl:
          process.env.MYSQL_SSL === "true"
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    }),
    UsersModule,
    PropertysModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
