import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [TagService],
      imports: [TypeOrmModule.forFeature([Tag, Post])],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  describe('root', () => {
    it('should return tags', async () => {
      const tag = new Tag();
      tag.id = 1;
      tag.name = 'Hello World';
      tag.createdAt = new Date();
      tag.updatedAt = null;
      const result = [tag];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.findAll()).toBe(result);
    });

    it('should return tag by id', async () => {
      const tag = new Tag();
      tag.id = 1;
      tag.name = 'Hello World';
      tag.createdAt = new Date();
      tag.updatedAt = null;
      const result = tag;
      jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.findById(1)).toBe(result);
    });

    it('should return number deleted tags by id', async () => {
      jest
        .spyOn(service, 'deleteById')
        .mockImplementation(() => Promise.resolve(1));
      expect(controller.deleteById(1)).toBe(1);
    });

    it('should return updated tag', async () => {
      const dto = new TagDto();
      dto.name = 'Hello World!!!!!!';

      const result = new Tag();
      result.id = 1;
      result.name = dto.name;
      result.createdAt = new Date();
      result.updatedAt = new Date();
      jest
        .spyOn(service, 'updateById')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.updateById(1, dto)).toBe(result);
      expect((await controller.updateById(1, dto)).updatedAt).not.toBe(null);
    });

    it('should return created tag', async () => {
      const dto = new TagDto();
      dto.name = 'Hello World!!!!!!';

      const result = new Tag();
      result.id = 1;
      result.name = dto.name;
      result.createdAt = new Date();
      result.updatedAt = null;
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(result));
      expect(controller.create(dto)).toBe(result);
      expect((await controller.create(dto)).createdAt).not.toBe(null);
    });
  });
});
