import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagDto } from './dto/tag.dto';
import { ErrorCodes } from 'src/shared/constant/error-codes.constant';
import { ErrorMessages } from 'src/shared/constant/error-messages.constant';
import { AppError } from 'src/shared/entity/app-error.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    try {
      return await this.tagRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOneBy({
        id,
      });

      if (!tag) {
        throw new AppError(
          ErrorCodes.TAG_NOT_FOUND,
          ErrorMessages.TAG_NOT_FOUND,
        );
      }
      tag.posts = await tag.posts;
      return tag;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<number> {
    try {
      const deleteResults = await this.tagRepository.delete({ id: id });
      if (!deleteResults.affected || deleteResults.affected === 0) {
        throw new AppError(
          ErrorCodes.TAG_NOT_FOUND,
          ErrorMessages.TAG_NOT_FOUND,
        );
      }
      return deleteResults.affected;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, dto: TagDto): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOneBy({ id });

      if (!tag) {
        throw new AppError(
          ErrorCodes.TAG_NOT_FOUND,
          ErrorMessages.TAG_NOT_FOUND,
        );
      }
      tag.name = dto.name;

      return await this.tagRepository.save(tag);
    } catch (error) {
      throw error;
    }
  }

  async create(dto: TagDto): Promise<Tag> {
    try {
      const post = new Tag();

      post.name = dto.name;
      return await this.tagRepository.save(post);
    } catch (error) {
      throw error;
    }
  }
}
