import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostCreateDto } from 'src/post/dto/post-create.dto';
import { PostUpdateDto } from 'src/post/dto/post-update.dto';
import { TagDto } from 'src/tag/dto/tag.dto';
import { Tag } from 'src/tag/tag.entity';
import { TagModule } from 'src/tag/tag.module';
import { TagService } from 'src/tag/tag.service';
import * as request from 'supertest';

describe('TagController (e2e)', () => {
  let app: INestApplication;
  const tagService = {
    findAll: function (): Tag[] {
      const tag = new Tag();
      tag.id = 1;
      tag.name = 'Hello';
      tag.createdAt = new Date();
      return [tag];
    },
    findById: function (id: number): Tag {
      return this.findAll().filter((tag) => tag.id === id);
    },
    deleteById: function (id: number): number {
      return this.findById(id) ? 1 : 0;
    },
    create: function (dto: TagDto): Tag {
      const tag = new Tag();
      tag.name = dto.name;
      tag.createdAt = new Date();
      tag.id = 1;
      return tag;
    },
    update: function (dto: TagDto): Tag {
      const tag = new Tag();
      tag.name = dto.name;
      tag.createdAt = new Date();
      tag.id = 1;
      return tag;
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TagModule],
    })
      .overrideProvider(TagService)
      .useValue(tagService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect({
      data: tagService.findAll(),
    });
  });

  it('/:id (GET)', () => {
    const id = 1;
    return request(app.getHttpServer())
      .get(`/${id}`)
      .expect(200)
      .expect({
        data: tagService.findById(id),
      });
  });

  it('/:id (DELETE)', () => {
    const id = 1;
    return request(app.getHttpServer())
      .delete(`/${id}`)
      .expect(200)
      .expect({
        data: tagService.deleteById(id),
      });
  });

  it('/ (POST)', () => {
    const dto = new TagDto();
    dto.name = 'hello';
    return request(app.getHttpServer())
      .post(`/`)
      .send(dto)
      .expect(200)
      .expect({
        data: tagService.create(dto),
      });
  });

  it('/ (PATCH)', () => {
    const dto = new TagDto();
    dto.name = 'hello';
    return request(app.getHttpServer())
      .post(`/`)
      .send(dto)
      .expect(200)
      .expect({
        data: tagService.update(dto),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
