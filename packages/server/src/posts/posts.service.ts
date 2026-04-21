import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.usersService.findOne(createPostDto.userId);
    
    const post = this.postsRepository.create({
      ...createPostDto,
      user,
      publishDate: new Date(),
    });
    
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
      order: { publishDate: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Post[]> {
    await this.usersService.findOne(userId);
    
    return this.postsRepository.find({
      where: { userId },
      order: { publishDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
  }
}