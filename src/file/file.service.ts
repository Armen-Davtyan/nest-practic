import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { File } from './file.entity';
import { GetAllFiles } from './file.controller';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async saveFile(file: any, postId: number) {
    const newFile = new File();
    newFile.originalName = file.originalname;
    newFile.path = `http://localhost:5016/${file.path}`;
    newFile.fileSize = file.size;
    if (postId) newFile.postId = postId;
    await this.fileRepository.save(newFile);
  }

  async findAll(dto: GetAllFiles) {
    let where = {};
    if (dto.search) {
      where = { originalName: ILike(`%${dto.search.trim()}%`) };
    }
    const [result, count] = await this.fileRepository.findAndCount({
      select: { id: true, path: true, originalName: true },
      where,
      skip: dto.offset,
      take: dto.limit,
    });

    return { result, count, has_more: true };
  }
}
