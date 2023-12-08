import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
      imports: [TypeOrmModule.forFeature([Tag, Post])],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  describe('root', () => {
    it('should return posts', async () => {
      const post = new Post();
      post.id = 1;
      post.title = 'Hello World';
      post.text = 'Hello World';
      post.createdAt = new Date();
      post.updatedAt = null;
      const result = [post];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.findAll()).toBe(result);
    });

    it('should return post by id', async () => {
      const post = new Post();
      post.id = 1;
      post.title = 'Hello World';
      post.text = 'Hello World';
      post.createdAt = new Date();
      post.updatedAt = null;
      post.tags = [];
      const result = post;
      jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.findById(1)).toBe(result);
    });

    it('should return number deleted post by id', async () => {
      jest
        .spyOn(service, 'deleteById')
        .mockImplementation(() => Promise.resolve(1));
      expect(controller.deleteById(1)).toBe(1);
    });

    it('should return updated tag', async () => {
      const tag = new Tag();
      tag.id = 1;
      tag.name = 'Hello World';
      tag.createdAt = new Date();
      tag.updatedAt = null;

      const post = new Post();
      post.id = 1;
      post.title = 'Hello World';
      post.text = 'Hello World';
      post.createdAt = new Date();
      post.updatedAt = null;
      post.tags = [tag];
      const result = post;

      const dto = new PostUpdateDto();
      dto.tags = [tag];
      dto.title = post.title;
      dto.text = post.text;

      jest
        .spyOn(service, 'updateById')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.updateById(1, dto)).toBe(result);
      expect((await controller.updateById(1, dto)).updatedAt).not.toBe(null);
    });

    it('should return created tag', async () => {
      const tag = new Tag();
      tag.id = 1;
      tag.name = 'Hello World';
      tag.createdAt = new Date();
      tag.updatedAt = null;

      const post = new Post();
      post.id = 1;
      post.title = 'Hello World';
      post.text = 'Hello World';
      post.createdAt = new Date();
      post.updatedAt = null;
      post.tags = [tag];
      const result = post;

      const dto = new PostCreateDto();
      dto.tags = [tag];
      dto.title = post.title;
      dto.text = post.text;

      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.create(dto)).toBe(result);
      expect((await controller.create(dto)).createdAt).not.toBe(null);
    });
  });
});
