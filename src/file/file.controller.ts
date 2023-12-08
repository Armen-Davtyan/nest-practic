import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { SuccessResponse } from './dto/dto.interface';

export class GetAllFiles {
  @ApiProperty({ required: true, default: 1 })
  limit: number;

  @ApiProperty({ required: true, default: 0 })
  offset: number;

  @ApiProperty({ required: false })
  search: string;
}

@ApiTags('file')
@Controller('file')
export class FileController {
  private readonly logger = new Logger(FileController.name);
  constructor(private readonly fileService: FileService) {}

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  @ApiResponse({
    type: SuccessResponse,
    status: 200,
    description: 'The file has been successfully found.',
  })
  async getAllFiles(@Query() dto: GetAllFiles) {
    return this.fileService.findAll(dto);
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        postId: {
          type: 'numbers',
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async uploadFile(@UploadedFile() file, @Body() body: { postId: number }) {
    await this.fileService.saveFile(file, body.postId);
    return { message: file?.originalname, status: 'ok' };
  }
}
