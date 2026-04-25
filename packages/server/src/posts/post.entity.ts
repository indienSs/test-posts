import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishDate: Date;

  @Column({ name: 'userId' })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, { 
    onDelete: 'CASCADE',
    eager: true 
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}