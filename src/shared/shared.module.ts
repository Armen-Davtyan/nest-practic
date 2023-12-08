import { Module } from '@nestjs/common';
import { BaseEntity } from './entity/base.entity';

@Module({
  imports: [],
  providers: [BaseEntity],
  exports: [BaseEntity],
})
export class SharedModule {}
