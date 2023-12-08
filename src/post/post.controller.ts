import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  Patch,
  Logger,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostUpdateDto } from './dto/post-update.dto';
import { Post as PostEntity } from './post.entity';
import { PostCreateDto } from './dto/post-create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('post')
@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'Fetchs all posts' })
  async findAll(): Promise<PostEntity[]> {
    try {
      return await this.postService.findAll();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetchs post by id' })
  async findById(@Param('id') id: number): Promise<PostEntity> {
    try {
      this.logger.log('id', id);
      return await this.postService.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes post by id' })
  async deleteById(@Param('id') id: number): Promise<number> {
    try {
      this.logger.log('id', id);
      return await this.postService.deleteById(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates post by id' })
  async updateById(
    @Param('id') id: number,
    @Body() dto: PostUpdateDto,
  ): Promise<PostEntity> {
    try {
      this.logger.log('id', id);
      this.logger.log('dto', dto);
      return await this.postService.updateById(id, dto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Creates post by id' })
  async create(@Body() dto: PostCreateDto): Promise<PostEntity> {
    try {
      this.logger.log('dto', dto);
      return await this.postService.create(dto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
