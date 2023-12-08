import {
  Patch,
  Post,
  Delete,
  Get,
  Controller,
  Param,
  Body,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { TagDto } from './dto/tag.dto';
import { Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/shared/constant/error-messages.constant';

@ApiTags('tag')
@Controller('tag')
@ApiResponse({ status: 500, description: ErrorMessages.SERVER_ERROR })
export class TagController {
  private readonly logger = new Logger(TagController.name);
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOperation({ summary: 'Fetchs all tags' })
  @ApiResponse({
    type: [Tag],
    status: 200,
    description: 'The tags has been successfully found.',
  })
  async findAll(): Promise<Tag[]> {
    try {
      return await this.tagService.findAll();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetchs tag by id' })
  @ApiResponse({
    type: Tag,
    status: 200,
    description: 'The tag has been successfully found.',
  })
  async findById(@Param('id') id: number): Promise<Tag> {
    try {
      this.logger.log('id', id);
      return await this.tagService.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes tag by id' })
  @ApiResponse({
    type: Number,
    status: 200,
    description: 'The tag has been successfully deleted.',
  })
  async deleteById(@Param('id') id: number): Promise<number> {
    try {
      this.logger.log('id', id);
      return await this.tagService.deleteById(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates tag by id' })
  @ApiResponse({
    type: Tag,
    status: 200,
    description: 'The tag has been successfully updated.',
  })
  async updateById(@Param('id') id: number, @Body() dto: TagDto): Promise<Tag> {
    try {
      this.logger.log('id', id);
      this.logger.log('dto', dto);
      return await this.tagService.updateById(id, dto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Creates tag' })
  @ApiResponse({
    type: Tag,
    status: 200,
    description: 'The tag has been successfully created.',
  })
  async create(@Body() dto: TagDto): Promise<Tag> {
    try {
      this.logger.log('dto', dto);
      return await this.tagService.create(dto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
