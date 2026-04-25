import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class SeedTestData1700000000001 implements MigrationInterface {
    name = 'SeedTestData1700000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
        const avatarsDir = path.join(uploadsDir, 'avatars');
        const postsDir = path.join(uploadsDir, 'posts');

        [uploadsDir, avatarsDir, postsDir].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        const userId = '00000000-0000-0000-0000-000000000001';
        const avatarFileName = 'default-avatar.png';

        await queryRunner.query(`
            INSERT INTO "users" (
                "id", 
                "firstName", 
                "lastName", 
                "email", 
                "phone", 
                "birthDate", 
                "about", 
                "avatar"
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            ) ON CONFLICT (email) DO NOTHING
        `, [
            userId,
            'User',
            'Test',
            'user.test@example.com',
            '+7 (999) 123-4567',
            '1990-05-15',
            'Software developer passionate about creating amazing applications. Love coding, hiking, and photography. Building awesome things with React, NestJS, and PostgreSQL!',
            avatarFileName
        ]);

        const posts = [
            {
                id: 'b1c2d3e4-f5a6-7890-bcde-f12345678901',
                content: 'Excited to join this platform! Looking forward to connecting with everyone and sharing experiences about software development and tech innovations. 🚀',
                images: 'post-1-1.jpg,post-1-2.jpg',
                publishDate: '2024-01-15 10:30:00',
                userId: userId
            },
            {
                id: 'c1d2e3f4-a5b6-7890-cdef-123456789012',
                content: 'Just finished working on a new feature using NestJS and React. The developer experience with these technologies is amazing! Type safety across the entire stack is a game-changer. 💻✨',
                images: 'post-2-1.jpg',
                publishDate: '2024-01-14 15:45:00',
                userId: userId
            },
            {
                id: 'd1e2f3a4-b5c6-7890-defa-234567890123',
                content: 'Beautiful day for some outdoor coding! Sometimes a change of scenery is all you need to solve that tricky bug. Where do you like to code? 🌳☀️',
                images: 'post-3-1.jpg,post-3-2.jpg,post-3-3.jpg',
                publishDate: '2024-01-13 12:00:00',
                userId: userId
            },
            {
                id: 'e1f2a3b4-c5d6-7890-efab-345678901234',
                content: 'Database design tip: Always consider your query patterns when designing your schema. Proper indexing can make a world of difference in performance! 📊',
                images: null,
                publishDate: '2024-01-12 09:15:00',
                userId: userId
            },
            {
                id: 'f1a2b3c4-d5e6-7890-fabc-456789012345',
                content: 'Just deployed my first Docker container to production! The journey from local development to production has never been smoother. Containerization is truly a game-changer for DevOps. 🐳',
                images: 'post-5-1.jpg',
                publishDate: '2024-01-11 18:30:00',
                userId: userId
            }
        ];

        for (const post of posts) {
            await queryRunner.query(`
                INSERT INTO "posts" (
                    "id", 
                    "content", 
                    "images", 
                    "publishDate", 
                    "userId"
                ) VALUES (
                    $1, $2, $3, $4, $5
                ) ON CONFLICT DO NOTHING
            `, [
                post.id,
                post.content,
                post.images,
                post.publishDate,
                post.userId
            ]);
        }

        console.log('✅ Test data seeded successfully!');
        console.log(`Test user email: john.doe@example.com`);
        console.log(`Test user ID: ${userId}`);
        console.log(`Created ${posts.length} test posts`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "posts" WHERE "userId" = '00000000-0000-0000-0000-000000000001'
        `);
        
        await queryRunner.query(`
            DELETE FROM "users" WHERE "id" = '00000000-0000-0000-0000-000000000001'
        `);
        
        console.log('✅ Test data removed successfully!');
    }
}