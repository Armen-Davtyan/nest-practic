import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostCreateDto } from 'src/post/dto/post-create.dto';
import { PostUpdateDto } from 'src/post/dto/post-update.dto';
import { Post } from 'src/post/post.entity';
import { PostModule } from 'src/post/post.module';
import { PostService } from 'src/post/post.service';
import * as request from 'supertest';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  const postService = {
    findAll: function (): Post[] {
      const post = new Post();
      post.id = 1;
      post.title = 'Hello';
      post.text = 'Hello';
      post.createdAt = new Date();
      return [post];
    },
    findById: function (id: number): Post {
      return this.findAll().filter((post) => post.id === id);
    },
    deleteById: function (id: number): number {
      return this.findById(id) ? 1 : 0;
    },
    create: function (dto: PostCreateDto): Post {
      const post = new Post();
      post.title = dto.title;
      post.text = dto.text;
      post.createdAt = new Date();
      post.id = 1;
      return post;
    },
    update: function (dto: PostUpdateDto): Post {
      const post = new Post();
      if (dto.title) {
        post.title = dto.title;
      }
      if (dto.text) {
        post.text = dto.text;
      }
      post.createdAt = new Date();
      post.updatedAt = new Date();
      post.id = 1;
      return post;
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    })
      .overrideProvider(PostService)
      .useValue(postService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect({
      data: postService.findAll(),
    });
  });

  it('/:id (GET)', () => {
    const id = 1;
    return request(app.getHttpServer())
      .get(`/${id}`)
      .expect(200)
      .expect({
        data: postService.findById(id),
      });
  });

  it('/:id (DELETE)', () => {
    const id = 1;
    return request(app.getHttpServer())
      .delete(`/${id}`)
      .expect(200)
      .expect({
        data: postService.deleteById(id),
      });
  });

  it('/ (POST)', () => {
    const dto = new PostCreateDto();
    dto.title = 'hello';
    dto.text = 'hello';
    return request(app.getHttpServer())
      .post(`/`)
      .send(dto)
      .expect(200)
      .expect({
        data: postService.create(dto),
      });
  });

  it('/ (PATCH)', () => {
    const dto = new PostUpdateDto();
    dto.title = 'hello';
    dto.text = 'hello';
    return request(app.getHttpServer())
      .post(`/`)
      .send(dto)
      .expect(200)
      .expect({
        data: postService.update(dto),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
