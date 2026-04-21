import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {}

  getHello(): string {
    return 'Hello World from NestJS!';
  }

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  async getDbStatus() {
    try {
      const isConnected = this.connection.isConnected;
      const users = await this.connection.query('SELECT COUNT(*) FROM users');
      const posts = await this.connection.query('SELECT COUNT(*) FROM posts');
      
      return {
        connected: isConnected,
        tables: {
          users: parseInt(users[0].count),
          posts: parseInt(posts[0].count),
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        connected: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}