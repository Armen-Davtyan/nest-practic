import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TagDto {
  @ApiProperty({ description: 'tag name' })
  @IsString()
  name: string;
}
