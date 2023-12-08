import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/post/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true, length: 120, type: 'varchar', nullable: false })
  @ApiProperty({ description: 'file path' })
  path: string;

  @Column({ length: 80, type: 'varchar', nullable: false })
  @ApiProperty()
  originalName: string;

  @Column({ length: 30, type: 'varchar', nullable: true })
  @ApiProperty()
  fileSize: string;

  @Column({ name: 'post_id', nullable: true })
  postId: number;

  @ManyToOne(() => Post, (post) => post.files)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
