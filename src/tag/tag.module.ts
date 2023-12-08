import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tag/tag.entity';
import { Post } from 'src/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Post])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
