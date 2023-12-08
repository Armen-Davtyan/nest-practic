import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/post/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;
  @CreateDateColumn()
  @ApiProperty({ description: 'creating date' })
  createdAt: Date;
  @UpdateDateColumn()
  @ApiProperty({ description: 'updating date' })
  updatedAt: Date;
  @Column({ unique: true, length: 50, type: 'varchar', nullable: false })
  @ApiProperty({ description: 'name' })
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Post, (post) => post.tags, { eager: true })
  @ApiProperty({ description: 'posts' })
  posts: Post[];
}
