import { MailModule } from './mail/mail.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PropertysModule } from './propertys/propertys.module';
import { PropertyServiceModule } from './property-service/property-service.module';
import { MailService } from './mail/mail.service';
import { ServicePropertysModule } from './service-propertys/service-propertys.module';
import { AppService } from './app.service';

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
    MailModule,
    UsersModule,
    PropertysModule,
    PropertyServiceModule,
    ServicePropertysModule,
  ],
  controllers: [],
  providers: [MailService, AppService],
})
export class AppModule { }
