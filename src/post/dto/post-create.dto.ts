import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, Length } from 'class-validator';

export class PostCreateDto {
  @ApiProperty({ description: 'post title, min length 2 chars, max - 50' })
  @IsString()
  @Length(2, 50)
  title: string;
  @ApiProperty({ description: 'post text, min length 2 chars, max - 500' })
  @IsString()
  @Length(2, 500)
  text: string;
  @ApiProperty({ description: 'tags for post, nullable', type: [String] })
  @IsArray()
  tags?: number[];
}
