import { ApiProperty } from '@nestjs/swagger';
import { File } from '../file.entity';

export class FileType {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: 'string' })
  path: string;
}

export class SuccessResponse {
  @ApiProperty({
    description: 'could contain some info',
    type: [File],
  })
  result?: [File];

  @ApiProperty({ type: 'number' })
  count: number;

  @ApiProperty({ type: 'boolean' })
  has_more: boolean;
}
