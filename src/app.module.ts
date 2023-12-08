import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { Request, Response } from 'express';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        customProps: (req: Request, res: Response) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/avatars',
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: join(__dirname, 'avatars'),
    }),
    DatabaseModule,
    SharedModule,
    PostModule,
    TagModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
