import { In, Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostUpdateDto } from './dto/post-update.dto';
import { Tag } from 'src/tag/tag.entity';
import { PostCreateDto } from './dto/post-create.dto';
import { Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/entity/app-error.entity';
import { ErrorCodes } from 'src/shared/constant/error-codes.constant';
import { ErrorMessages } from 'src/shared/constant/error-messages.constant';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Post[]> {
    try {
      return await this.postRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOneBy({
        id,
      });

      if (!post) {
        throw new AppError(
          ErrorCodes.POST_NOT_FOUND,
          ErrorMessages.POST_NOT_FOUND,
        );
      }

      post.tags = await post.tags;
      return post;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<number> {
    try {
      const deleteResults = await this.postRepository.delete({ id: id });
      if (!deleteResults.affected || deleteResults.affected === 0) {
        throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
      }
      return deleteResults.affected;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, dto: PostUpdateDto): Promise<Post> {
    try {
      const post = await this.postRepository.findOneBy({ id });

      if (!post) {
        throw new AppError(
          ErrorCodes.POST_NOT_FOUND,
          ErrorMessages.POST_NOT_FOUND,
        );
      }

      if (dto.title) {
        post.title = dto.title;
      }
      if (dto.text) {
        post.text = dto.text;
      }
      if (dto.tags) {
        post.tags = await this.tagRepository.findBy({ id: In(dto.tags) });
      }

      return await this.postRepository.save(post);
    } catch (error) {
      throw error;
    }
  }

  async create(dto: PostCreateDto): Promise<Post> {
    try {
      const post = new Post();

      post.title = dto.title;
      post.text = dto.text;
      if (dto.tags && dto.tags.length > 0) {
        post.tags = await this.tagRepository.findBy({ id: In(dto.tags) });
      }

      return await this.postRepository.save(post);
    } catch (error) {
      throw error;
    }
  }
}
