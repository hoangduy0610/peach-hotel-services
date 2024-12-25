import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/AuthModule';
import typeorm from './commons/TypeORMConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envFiles } from './commons/Constant';
import { RoomModule } from './modules/RoomModule';
import { ServiceModule } from './modules/ServiceModule';
import { PromoteModule } from './modules/PromoteModule';
import { BookingModule } from './modules/BookingModule';
import { RatingModule } from './modules/RatingModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFiles,
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    AuthModule,
    RoomModule,
    ServiceModule,
    PromoteModule,
    BookingModule,
    RatingModule,
  ]
})
export class AppModule { }