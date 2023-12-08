import { Module, Global, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/file.entity';
import { Post } from 'src/post/post.entity';
import { Tag } from 'src/tag/tag.entity';

function DatabaseOrmModule(): DynamicModule {
  const appModeIsProd = process.env.NODE_ENV === 'production' ? true : false;
  return TypeOrmModule.forRoot({
    logging: true,
    type: 'postgres',
    host: appModeIsProd ? 'host.docker.internal' : 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASS || '123456',
    database: process.env.DB_NAME || 'nest_project',
    entities: [Post, Tag, File],
    synchronize: true,
  });
}

@Global()
@Module({
  imports: [DatabaseOrmModule()],
})
export class DatabaseModule {}
