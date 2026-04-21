import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany 
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}